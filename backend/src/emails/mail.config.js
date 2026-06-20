import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

export const createTrasporter = () => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: ENV.SMTP_USER,
            pass: ENV.SMTP_USER_PASS,
        },
    });
};
