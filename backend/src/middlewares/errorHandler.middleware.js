import z from "zod";
import { HTTPSTATUS } from "../lib/http.js";

export const errorHandler = (err, req, res, next) => {
    console.log(`[Error] occured: ${req.path}`, err);

    if (err instanceof z.ZodError) {
        const formattedErrors = z.treeifyError(err);

        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors,
        });
    }

    const statusCode = err.statusCode || HTTPSTATUS.INTERNAL_SERVER_ERROR;

    const message =
        statusCode === HTTPSTATUS.INTERNAL_SERVER_ERROR
            ? "Internal server error"
            : err.message;

    return res.status(statusCode).json({
        success: false, // Keeps the response shape consistent with your sendResponse
        message: message,
        error: err?.message || "Something went wrong",
    });
};
