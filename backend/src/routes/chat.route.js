import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { sendMessage } from "../controllers/message.controller.js";
import {
    createChat,
    getSingleChat,
    getUserChats,
} from "../controllers/chat.controller.js";

const chatRouter = Router()
    .use(protectRoute)
    .post("/create", createChat)
    .post("/message/send", sendMessage)
    .get("/all", getUserChats)
    .get("/:id", getSingleChat);

export default chatRouter;
