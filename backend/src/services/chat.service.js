import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { AppError } from "../lib/AppError.js";
import { Message } from "../models/message.model.js";
import { emitNewChatToParticipants } from "../lib/socket.js";

export const createChatService = async (userId, body) => {
    const { participantId, isGroup, participants, groupName } = body;
    let chat;
    let allParticipantIds = [];

    if (isGroup && participants?.length && groupName) {
        allParticipantIds = [userId, ...participants];

        chat = await Chat.create({
            participants: allParticipantIds,
            isGroup: true,
            groupName,
            createdBy: userId,
        });
    } else if (participantId) {
        const otherUser = await User.findById(participantId);

        if (!otherUser) {
            throw new AppError("User not found", 404);
        }

        allParticipantIds = [userId, participantId];

        const existingChat = await Chat.findOne({
            participants: {
                $all: allParticipantIds,
                $size: 2,
            },
        }).populate("participants", "name avatar");

        if (existingChat) return existingChat;

        chat = await Chat.create({
            participants: allParticipantIds,
            isGroup: false,
            groupName,
            createdBy: userId,
        });
    }

    const populatedChat = chat?.populate("participants", "name avatar");
    const participantIdStrings = populatedChat?.participants?.map((p) => {
        return p?._id.toString();
    });

    emitNewChatToParticipants(allParticipantIds, populatedChat);

    return chat;
};

export const getUserChatsService = async (userId) => {
    const chats = await Chat.find({
        participants: {
            $in: [userId],
        },
    })
        .populate("participants", "name avatar")
        .populate({
            path: "lastMessage",
            populate: {
                path: "sender",
                select: "name avatar",
            },
        })
        .sort({ updatedAt: -1 });

    return chats;
};

export const getSingleChatService = async (chatId, userId) => {
    const chat = await Chat.findOne({
        _id: chatId,
        participants: {
            $in: [userId],
        },
    }).populate("participants", "name avatar");

    if (!chat) {
        throw new AppError("Chat not found / not authorized to view chat", 200);
    }

    const messages = await Message.find({
        chatId,
    })
        .populate("sender", "name avatar")
        .populate({
            path: "replyTo",
            select: "content image sender",
            populate: {
                path: "sender",
                select: "name avatar",
            },
        })
        .sort({ createdAt: 1 });

    return { chat, messages };
};

export const validateChatPariticipant = async (chatId, userId) => {
    const chat = await Chat.findOne({
        _id: chatId,
        participants: {
            $in: [userId],
        },
    });

    if (!chat) throw new AppError("user not a pariticipants in chat");
    return chat;
};
