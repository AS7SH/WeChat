import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { AppError } from "../lib/AppError.js";
import cloudinary from "../config/cloudinary.js";
import {
    emitLastMessageToChatRoom,
    emitLastMessageToPariticipants,
} from "../lib/socket.js";

export const sendMessageService = async (userId, body) => {
    const { chatId, content, image, replyToId } = body;

    const chat = await Chat.findOne({
        _id: chatId,
        participants: {
            $in: [userId],
        },
    });

    let newMessage;

    if (!chat) {
        throw new AppError("Chat not found or Unauthorized");
    }

    if (replyToId) {
        const replyToMessage = await Message.findOne({
            _id: replyToId,
            chatId,
        });

        if (!replyToMessage) {
            throw new AppError("Reply Message not found");
        }
    }

    let imageUrl;

    if (image) {
        const uploadResult = await cloudinary.uploader.upload(image);
        imageUrl = uploadResult.secure_url;
    }

    newMessage = await Message.create({
        chatId,
        sender: userId,
        content,
        image: imageUrl,
        replyTo: replyToId || null,
    });

    await newMessage.populate([
        {
            path: "sender",
            select: "name avatar",
        },
        {
            path: "replyTo",
            select: "content image sender",
            populate: {
                path: "sender",
                select: "name avatar",
            },
        },
    ]);

    chat.lastMessage = newMessage?._id;
    await chat.save();

    emitLastMessageToChatRoom(userId, chatId, chat.lastMessage);

    const allParticipantIds = chat.participants.map((id) => id.toString());
    emitLastMessageToPariticipants(allParticipantIds, chatId, newMessage);

    return { userMessage: newMessage, chat };
};
