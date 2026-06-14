import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/getUsers", getUsers);

export default router;
