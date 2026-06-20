import { Router } from "express";
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

const authRouter = Router()
    .get("/check-auth", protectRoute, checkAuth)
    .post("/signup", signup)
    .post("/login", login)
    .post("/logout", logout)
    .post("/verify-email", protectRoute, verifyEmail)
    .post("/resend-verification", protectRoute, resendVerification)
    .post("/forgot-password", forgotPassword)
    .post("/reset-password", resetPassword)
    .post("/change-password", protectRoute, changePassword);

// router.put("/profile-picture", protectRoute, updateProfilePicture);
export default authRouter;
