import { User } from "../models/user.model.js";
import {
    clearJwtAuthCookie,
    sendResponse,
    setJwtAuthCookie,
} from "../lib/utils.js";

export const getUsers = async (req, res) => {
    const userId = req.user?._id;

    try {
        const users = await User.find({
            _id: { $ne: userId },
        }).select("-password");

        return sendResponse(res, 201, true, "User created successfully", users);
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, "Internal server error");
    }
};
