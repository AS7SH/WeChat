import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUsers } from "../controllers/user.controller.js";

const userRouter = Router().use(protectRoute).get("/all", getUsers);

export default userRouter;
