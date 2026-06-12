import jwt from "jsonwebtoken";

export const sendResponse = (res, code, success, message, data = null) => {
    return res.status(code).json({
        success,
        message,
        data,
    });
};

export const getOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};
