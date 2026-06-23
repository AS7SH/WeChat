import { sendForgotPassEmail, sendOTPEmail } from "../emails/mails.js";
import { AppError } from "../lib/AppError.js";
import { getOTP, HTTPSTATUS } from "../utils/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const sanitizeUser = (user) => {
    const cleanUser = user.toObject();
    delete cleanUser.password;
    return cleanUser;
};

export const signupService = async ({ username, email, name, password }) => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new AppError("Email already in use", HTTPSTATUS.BAD_REQUEST);
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        throw new AppError("Username already in use", HTTPSTATUS.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);
    const verificationToken = getOTP();

    const user = await User.create({
        name,
        email,
        username,
        password: hashPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000,
    });

    await sendOTPEmail(user);

    return sanitizeUser(user);
};

export const verifyEmailService = async (user, code) => {
    if (!user.verificationToken || user.verificationToken !== code) {
        throw new AppError(
            "Invalid Verification Token",
            HTTPSTATUS.BAD_REQUEST,
        );
    }

    if (
        user.verificationTokenExpiresAt &&
        user.verificationTokenExpiresAt < new Date()
    ) {
        throw new AppError(
            "Verification Token has Expired",
            HTTPSTATUS.BAD_REQUEST,
        );
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;

    await user.save();

    return sanitizeUser(user);
};

export const resendVerificationService = async (user) => {
    const otp = getOTP();

    user.verificationToken = otp;
    user.verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    await sendOTPEmail(user);

    return sanitizeUser(user);
};

export const loginService = async (
    { identifier, password },
    identifiedItem,
) => {
    const user = await User.findOne({ [identifiedItem]: identifier });

    if (!user) {
        throw new AppError("User not found", HTTPSTATUS.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError("Invalid Credentials", HTTPSTATUS.BAD_REQUEST);
    }

    user.lastLogin = new Date();
    await user.save();

    return sanitizeUser(user);
};

export const forgotPasswordService = async ({ email }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("User not found", HTTPSTATUS.BAD_REQUEST);
    }

    const resetPassToken = getOTP();
    const resetPassTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPassToken = resetPassToken;
    user.resetPassTokenExpiresAt = resetPassTokenExpiresAt;

    await user.save();

    await sendForgotPassEmail(user);

    return sanitizeUser(user);
};

export const resetPasswordService = async ({ code, email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("User not found", HTTPSTATUS.BAD_REQUEST);
    }

    if (!user.resetPassToken || user.resetPassToken !== code) {
        throw new AppError("Invalid code", HTTPSTATUS.BAD_REQUEST);
    }

    if (
        user.resetPassTokenExpiresAt &&
        user.resetPassTokenExpiresAt < new Date()
    ) {
        throw new AppError("Reset code has expired", HTTPSTATUS.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    user.resetPassToken = undefined;
    user.resetPassTokenExpiresAt = undefined;

    await user.save();

    return sanitizeUser(user);
};

export const changePasswordService = async (
    { currentPassword, newPassword },
    user,
) => {
    const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
    );

    if (!isCurrentPasswordValid) {
        throw new AppError(
            "Current password is Incorrect",
            HTTPSTATUS.BAD_REQUEST,
        );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return sanitizeUser(user);
};
