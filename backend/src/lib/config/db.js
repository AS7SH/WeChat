import mongoose from "mongoose";
import { ENV } from "./env.js";

export const coonectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log(`Mongo DB connected ${conn.connection.host}`);
    } catch (error) {
        console.log("Error Connecting to DB", error);
    }
};
