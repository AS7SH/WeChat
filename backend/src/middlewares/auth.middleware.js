import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV } from "../lib/config/env.js";
import { HTTPSTATUS } from "../lib/http.js";
import { AppError } from "../lib/AppError.js";

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        throw new AppError("Token not found", HTTPSTATUS.BAD_REQUEST);
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) {
        throw new AppError(
            "Unauthorized - Invalid token",
            HTTPSTATUS.BAD_REQUEST,
        );
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        throw new AppError("User not found", HTTPSTATUS.BAD_REQUEST);
    }

    req.user = user;

    next();
};
