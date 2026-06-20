import { sendResponse } from "../utils/utils.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { getUsersService } from "../services/user.service.js";

export const getUsers = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const users = await getUsersService(userId);

    return sendResponse(res, 201, true, "User retrieved successfully", users);
});
