import jwt from "jsonwebtoken";
import { sendResponse } from "../util/sendResponse.js";

export const verifyToken = (req, res, next) => {
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

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(`Error : ${error}`);
        return sendResponse(res, 500, false, "Internal server Error", error);
    }
};
