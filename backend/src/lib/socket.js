import { Server } from "socket.io";
import { ENV } from "../config/env.js";
import jwt from "jsonwebtoken";

let io = null;

const onlineUsers = new Map();

export const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: ENV.FRONTEND_ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.use(async (socket, next) => {
        try {
            const rawCookie = socket.handshake.headers.cookie;
            if (!rawCookie) return next(new Error("Unauthorized"));

            const token = rawCookie?.split("=")?.[1]?.trim();
            if (!token) return next(new Error("Unauthorized"));

            const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
            if (!decodedToken) return next(new Error("Unauthorized"));

            socket.userId = decodedToken.userId;

            next();
        } catch (error) {
            next(new Error("Internal Server Error"));
        }
    });

    io.on("connection", (socket) => {
        if (!socket.userId) {
            socket.disconnect(true);
            return;
        }

        const userId = socket.userId;
        const socketId = socket.id;

        console.log(`userId: ${userId}`);
        console.log(`socketId: ${socketId}`);

        onlineUsers.set(userId, socketId);

        io?.emit("online:users", Array.from(onlineUsers.keys()));

        socket.join(`user:${userId}`);

        socket.on("chat:join", async (chatId, callback) => {
            try {
                await validateChatPariticipant(chatId, userId);
                socket.join(`chat:${chatId}`);
                callback?.();
            } catch (error) {
                callback?.("Error joining chat");
            }
        });

        socket.on("chat:leave", (chatId) => {
            if (chatId) {
                socket.leave(`chat:${chatId}`);
                console.log(`User: ${userId} left room chat ${chatId}`);
            }
        });

        socket.on("disconnect", () => {
            if (onlineUsers.get(userId) === socketId) {
                if (userId) onlineUsers.delete(userId);

                io?.emit("online:users", Array.from(onlineUsers.keys()));

                console.log(`socket disconnected: ${(userId, socketId)}`);
            }
        });
    });
};

const getIO = () => {
    if (!io) throw new Error("Socket io not initialized");
    return io;
};

export const emitNewChatToParticipants = (allParticipantIds, chat) => {
    const io = getIO();
    for (const participantId of allParticipantIds) {
        io.to(`user:${participantId}`).emit("chat:new", chat);
    }
};

export const emitLastMessageToChatRoom = (userId, chatId, message) => {
    const io = getIO();
    const senderSocketId = onlineUsers.get(userId);

    if (senderSocketId) {
        io.to(`chat:${chatId}`)
            .except(senderSocketId)
            .emit(`message:new`, message);
    } else {
        io.to(`chat:${chatId}`).emit(`message:new`, message);
    }
};

export const emitLastMessageToPariticipants = (
    allParticipantIds,
    chatId,
    lastMessage,
) => {
    const io = getIO();
    const payload = { chatId, lastMessage };

    for (const participantId of allParticipantIds) {
        io.to(`user:${participantId}`).emit(`chat:update`, payload);
    }
};
