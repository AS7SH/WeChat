import { Server as HTTPServer } from "http";
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
    });
};
