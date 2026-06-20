import { AppError } from "../lib/AppError.js";
import { HTTPSTATUS } from "../utils/utils.js";
import { User } from "../models/user.model.js";

export const getUsersService = async (userId) => {
    const users = await User.find({
        _id: { $ne: userId },
    }).select("-password");

    if (!users) {
        throw new AppError(
            "Error retrieving Users",
            HTTPSTATUS.INTERNAL_SERVER_ERROR,
        );
    }

    return users;
};
