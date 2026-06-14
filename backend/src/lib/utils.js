import jwt from "jsonwebtoken";
import { ENV } from "./config/env.js";

export const sendResponse = (res, code, success, message, data = null) => {
    return res.status(code).json({
        success,
        message,
        data,
    });
};

export const getOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

export const setJwtAuthCookie = (res, userId) => {
    const payload = { userId };

    const token = jwt.sign(payload, ENV.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production" ? true : false,
        sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const clearJwtAuthCookie = (res) => {
    res.clearCookie("accessToken", { path: "/" });
};
