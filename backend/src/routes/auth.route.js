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
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check-auth", protectRoute, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", protectRoute, verifyEmail);
router.post("/resend-verification", protectRoute, resendVerification);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// router.put("/profile-picture", protectRoute, updateProfilePicture);

router.post("/change-password", protectRoute, changePassword);

export default router;
