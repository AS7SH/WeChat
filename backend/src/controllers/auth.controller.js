import { HTTPSTATUS } from "../lib/http.js";
import {
    clearJwtAuthCookie,
    sendResponse,
    setJwtAuthCookie,
} from "../lib/utils.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import {
    changePasswordService,
    forgotPasswordService,
    loginService,
    resendVerificationService,
    resetPasswordService,
    signupService,
    verifyEmailService,
} from "../services/auth.service.js";
import {
    signupSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema,
} from "../validators/auth.validator.js";

export const signup = asyncHandler(async (req, res) => {
    const body = signupSchema.parse(req.body);

    const userData = await signupService(body);

    setJwtAuthCookie(res, userData._id);

    return sendResponse(
        res,
        HTTPSTATUS.CREATED,
        true,
        "User created successfully",
        userData,
    );
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const { code } = req.body;
    const user = req.user;

    const userData = await verifyEmailService(user, code);

    return sendResponse(
        res,
        200,
        true,
        "Email verified successfully",
        userData,
    );
});

export const resendVerification = asyncHandler(async (req, res) => {
    const userData = await resendVerificationService(req.user);

    return sendResponse(
        res,
        201,
        true,
        "verification email sent successfully",
        userData,
    );
});

export const login = asyncHandler(async (req, res) => {
    const body = loginSchema.parse(req.body);

    const identifiedItem = body.identifier.includes("@") ? "email" : "username";

    const userData = await loginService(body, identifiedItem);

    setJwtAuthCookie(res, userData._id);

    return sendResponse(res, 200, true, "Logged in successfully", userData);
});

export const logout = asyncHandler(async (req, res) => {
    clearJwtAuthCookie(res);
    return sendResponse(res, 200, true, "logged out successfully");
});

export const forgotPassword = asyncHandler(async (req, res) => {
    const body = forgotPasswordSchema.parse(req.body);

    const userData = await forgotPasswordService(body);

    return sendResponse(res, 200, true, "Email sent successfully", userData);
});

export const resetPassword = asyncHandler(async (req, res) => {
    const body = resetPasswordSchema.parse(req.body);

    const userData = await resetPasswordService(body);

    return sendResponse(
        res,
        200,
        true,
        "Password changed successfully",
        userData,
    );
});

export const changePassword = asyncHandler(async (req, res) => {
    const body = changePasswordSchema.parse(req.body);

    const userData = await changePasswordService(body, req.user);

    return sendResponse(
        res,
        200,
        true,
        "Password changed successfully",
        userData,
    );
});

export const checkAuth = asyncHandler(async (req, res) => {
    return sendResponse(
        res,
        200,
        true,
        "User successfully authenticated",
        req.user,
    );
});

// export const updateProfilePicture = async (req, res) => {
//     const userId = req.user._id;
//
//         const { profilePic } = req.body;
//         if (!profilePic) {
//             return sendResponse(res, 400, false, "Profile picture is required");
//         }
//
//         const uploadResponse = await cloudinary.uploader.upload(profilePic);
//
//         const user = await User.findByIdAndUpdate(
//             userId,
//             { profilePic: uploadResponse.secure_url },
//             { new: true },
//         );
//
//         return sendResponse(
//             res,
//             200,
//             true,
//             "Profile Picture updated successfully",
//             user,
//         );
// };
