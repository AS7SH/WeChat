import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { coonectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ENV } from "./lib/env.js";

import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = ENV.PORT || 3000;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    coonectDB();
    console.log(`Service started at PORT : ${PORT}`);
});
