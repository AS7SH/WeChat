import { User } from "../models/user.model.js";
import { sendResponse } from "./sendResponse.js";
import jwt from "jsonwebtoken";

export const getUserFromToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return sendResponse(res, 401, false, "Verification token not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
        return sendResponse(res, 404, false, "User not found");
    }

    req.user = user;

    next();
};
