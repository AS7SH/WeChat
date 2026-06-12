import express from "express";
import {
    login,
    logout,
    signup,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    changePassword,
    checkAuth,
    updateProfilePicture,
} from "../controllers/auth.controller.js";
import {
    checkSignupFormat,
    checkSigninFormat,
    checkforgotPasswordFormat,
    checkResetPasswordFormat,
    checkChangePasswordFormat,
} from "../validations/checkInputFormat.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check-auth", protectRoute, checkAuth);

router.post("/signup", checkSignupFormat, signup);
router.post("/login", checkSigninFormat, login);
router.post("/logout", logout);

router.post("/verify-email", protectRoute, verifyEmail);
router.post("/resend-verification", protectRoute, resendVerification);

router.post("/forgot-password", checkforgotPasswordFormat, forgotPassword);
router.post("/reset-password", checkResetPasswordFormat, resetPassword);

router.put("/profile-picture", protectRoute, updateProfilePicture);

router.post(
    "/change-password",
    protectRoute,
    checkChangePasswordFormat,
    changePassword,
);

export default router;
