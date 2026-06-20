import { HTTPSTATUS } from "../utils/utils.js";

export class AppError extends Error {
    constructor(message, statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }
}
