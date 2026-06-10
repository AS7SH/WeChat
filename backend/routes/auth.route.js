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
import { getUserFromToken } from "../util/getUserFromToken.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", checkSignupFormat, signup);
router.post("/login", checkSigninFormat, login);
router.post("/logout", logout);

router.post("/verify-email", getUserFromToken, verifyEmail);
router.post("/resend-verification", getUserFromToken, resendVerification);

router.post("/forgot-password", checkforgotPasswordFormat, forgotPassword);
router.post("/reset-password/:token", checkResetPasswordFormat, resetPassword);

router.post(
    "/change-password",
    getUserFromToken,
    checkChangePasswordFormat,
    changePassword,
);

export default router;
