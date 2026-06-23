import z from "zod";
import { HTTPSTATUS } from "../utils/utils.js";

export const errorHandler = (err, req, res, next) => {
    console.log(`[Error] occured: ${req.path}`, err);

    if (err instanceof z.ZodError) {
        const validationIssues = err.issues || err.errors || [];
        const firstErrorMessage =
            validationIssues[0]?.message || "Validation failed";
        console.log(firstErrorMessage);

        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            success: false,
            message: firstErrorMessage,
            errors:
                typeof err.flatten === "function"
                    ? z.treeifyError(err)
                    : validationIssues,
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
