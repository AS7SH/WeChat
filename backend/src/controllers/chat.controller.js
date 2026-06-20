import { sendResponse } from "../utils/utils.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import {
    createChatService,
    getUserChatsService,
    getSingleChatService,
} from "../services/chat.service.js";
import {
    chatIdSchema,
    createChatSchema,
} from "../validators/chat.validator.js";

export const createChat = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const body = createChatSchema.parse(req.body);

    const chat = await createChatService(userId, body);

    return sendResponse(res, 201, true, "Chat created successfully", chat);
});

export const getUserChats = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const chats = await getUserChatsService(userId);

    return sendResponse(
        res,
        200,
        true,
        "User chats retrieved successfully",
        chats,
    );
});

export const getSingleChat = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { id } = chatIdSchema.parse(req.params);

    const { chat, messages } = await getSingleChatService(id, userId);

    return sendResponse(res, 200, true, "chat retrieved successfully", {
        chat,
        messages,
    });
});
