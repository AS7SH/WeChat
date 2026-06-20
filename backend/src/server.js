import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import router from "./routes/index.js";
import { coonectDB } from "./config/db.js";
import { initializeSocket } from "./lib/socket.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();
const server = http.createServer(app);

initializeSocket();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ENV.FRONTEND_ORIGIN,
        credentials: true,
    }),
);

const PORT = ENV.PORT || 3000;

//route
app.use("/api", router);

//error handler
app.use(errorHandler);

server.listen(PORT, () => {
    coonectDB();
    console.log(`Service started at PORT : ${PORT}`);
});
