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
} from "../controllers/auth.controller.js";
import {
    checkSignupFormat,
    checkSigninFormat,
    checkforgotPasswordFormat,
    checkResetPasswordFormat,
    checkChangePasswordFormat,
} from "../validations/checkInputFormat.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check-auth", protectedRoute);
// router.get("/check-auth", protectedRoute, checkAuth);

router.post("/signup", checkSignupFormat, signup);
router.post("/login", checkSigninFormat, login);
router.post("/logout", logout);

router.post("/verify-email", protectedRoute, verifyEmail);
router.post("/resend-verification", protectedRoute, resendVerification);

router.post("/forgot-password", checkforgotPasswordFormat, forgotPassword);
router.post("/reset-password", checkResetPasswordFormat, resetPassword);

router.post(
    "/change-password",
    protectedRoute,
    checkChangePasswordFormat,
    changePassword,
);

export default router;
