import { User } from "../models/user.model.js";
import { sendResponse } from "../lib/utils.js";
import { getOTP } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils.js";
import { sendOTPEmail, sendForgotPassEmail } from "../emails/mails.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { username, password, email, name } = req.body;

    try {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return sendResponse(res, 400, false, "Email already in use");
        }

        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return sendResponse(res, 400, false, "Username already in use");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = getOTP();

        const user = await User.create({
            name,
            email,
            username,
            password: hashPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000,
        });

        const token = generateTokenAndSetCookie(res, user._id);

        const userData = {
            ...user._doc,
            password: undefined,
        };

        await sendOTPEmail(user);

        return sendResponse(
            res,
            201,
            true,
            "User created successfully",
            userData,
        );
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, false, "Internal server error");
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = req.user;

        if (!user.verificationToken || user.verificationToken !== code) {
            return sendResponse(res, 400, false, "Invalid verification code");
        }

        if (
            user.verificationTokenExpiresAt &&
            user.verificationTokenExpiresAt < new Date()
        ) {
            return sendResponse(
                res,
                400,
                false,
                "Verification code has expired",
            );
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        return sendResponse(res, 200, true, "Email verified successfully", {
            ...user._doc,
            password: undefined,
        });
    } catch (error) {
        console.error("Error verifying email:", error);

        return sendResponse(res, 401, false, "Invalid or expired token");
    }
};

export const resendVerification = async (req, res) => {
    try {
        const user = req.user;

        const otp = getOTP();

        user.verificationToken = otp;
        user.verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        await sendOTPEmail(user);

        const userData = {
            ...user._doc,
            password: undefined,
        };

        return sendResponse(
            res,
            201,
            true,
            "verification email sent successfully",
            userData,
        );
    } catch (error) {
        console.error(`Error : ${error}`);
        return sendResponse(res, 500, false, "Internal server Error", error);
    }
};

export const login = async (req, res) => {
    const { identifier, password } = req.body;
    const identifiedItem = req.identifiedItem;

    try {
        const user = await User.findOne({ [identifiedItem]: identifier });

        if (!user) {
            return sendResponse(res, 400, false, "Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return sendResponse(res, 400, false, "Invalid credentials");
        }

        const token = generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        return sendResponse(res, 200, true, "Logged in successfully", {
            ...user._doc,
            password: undefined,
        });
    } catch (error) {
        console.error(`Error : ${error}`);
        return sendResponse(res, 500, false, "Internal server Error", error);
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    sendResponse(res, 200, true, "logged out successfully");
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return sendResponse(res, 400, false, "User not Found");
        }

        const resetPassToken = getOTP();
        const resetPassTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPassToken = resetPassToken;
        user.resetPassTokenExpiresAt = resetPassTokenExpiresAt;

        await user.save();

        console.log(resetPassToken);

        await sendForgotPassEmail(user);

        return sendResponse(res, 200, true, "Email sent successfully", {
            ...user._doc,
            password: undefined,
        });
    } catch (error) {
        console.error(`Error : ${error}`);
        return sendResponse(res, 500, false, "Internal server Error", error);
    }
};

export const resetPassword = async (req, res) => {
    const { code, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        console.log(user);

        if (!user) {
            return sendResponse(res, 400, false, "User doesnt exist");
        }

        if (!user.resetPassToken || user.resetPassToken !== code) {
            return sendResponse(res, 400, false, "Invalid code");
        }

        if (
            user.resetPassTokenExpiresAt &&
            user.resetPassTokenExpiresAt < new Date()
        ) {
            return sendResponse(res, 400, false, "Reset Code has expired");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;
        user.resetPassToken = undefined;
        user.resetPassTokenExpiresAt = undefined;

        await user.save();

        return sendResponse(res, 200, true, "Password changed successfully");
    } catch (error) {
        console.error(`Error : ${error}`);
        return sendResponse(res, 500, false, "Internal server Error", error);
    }
};

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    try {
        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password,
        );

        if (!isCurrentPasswordValid) {
            return sendResponse(
                res,
                400,
                false,
                "Current password is incorrect",
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return sendResponse(res, 200, true, "Password changed successfully");
    } catch (error) {
        console.error(`Error: ${error}`);
        return sendResponse(res, 500, false, "Internal server error");
    }
};

export const checkAuth = async (req, res) => {
    try {
        return sendResponse(
            res,
            200,
            true,
            "User successfully authenticated",
            req.user,
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return sendResponse(res, 500, false, "Internal server error");
    }
};

export const updateProfilePicture = async (req, res) => {
    const userId = req.user._id;

    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return sendResponse(res, 400, false, "Profile picture is required");
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const user = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true },
        );

        return sendResponse(
            res,
            200,
            true,
            "Profile Picture updated successfully",
            user,
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return sendResponse(res, 500, false, "Internal server error");
    }
};
