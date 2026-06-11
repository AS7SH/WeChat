import { createTrasporter } from "./mail.config.js";
import { HTML_ForgotPass_Email, HTML_OTP_Email } from "./templates.js";

export const sendOTPEmail = async (user) => {
    const HTML_Template = HTML_OTP_Email(
        user.username,
        "OTP to verify the email",
        "15 Minutes",
        user.verificationToken,
    );

    const trasporter = createTrasporter();

    await trasporter.sendMail({
        to: user.email,
        subject: "OTP to Verify the Email",
        html: HTML_Template,
    });
};

export const sendForgotPassEmail = async (user) => {
    const HTML_Template = HTML_ForgotPass_Email(
        user.username,
        "OTP to reset Password",
        "1 Hour",
        user.resetPassToken,
    );
    console.log(`${process.env.CLIENT_URI}/reset-pass/${user.resetPassToken}`);
    const trasporter = createTrasporter();

    await trasporter.sendMail({
        to: user.email,
        subject: "OTP to Reset Password",
        html: HTML_Template,
    });
};
