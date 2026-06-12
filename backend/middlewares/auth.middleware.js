import jwt from "jsonwebtoken";
import { sendResponse } from "../lib/utils.js";
import { User } from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return sendResponse(
            res,
            401,
            false,
            "Unauthorized - Token not provided",
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return sendResponse(
                res,
                401,
                false,
                "Unauthorized - Invalid Token",
            );
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return sendResponse(res, 400, false, "User not found");
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(`Error : ${error}`);
        return sendResponse(res, 500, false, "Internal server Error", error);
    }
};
