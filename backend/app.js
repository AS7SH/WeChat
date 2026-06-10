import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { coonectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    coonectDB();
    console.log(`Service started at PORT : ${PORT}`);
});
