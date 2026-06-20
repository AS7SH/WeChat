import { sendResponse } from "../utils/utils.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { sendMessageService } from "../services/message.service.js";
import { sendMessageSchema } from "../validators/message.validator.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const body = sendMessageSchema.parse(req.body);

    const response = await sendMessageService(userId, body);

    return sendResponse(res, 200, true, "Message sent successfully", response);
});
