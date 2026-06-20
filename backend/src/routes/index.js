import { Router } from "express";

import authRouter from "./auth.route.js";
import chatRouter from "./chat.route.js";
import userRouter from "./user.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/user", userRouter);

export default router;
