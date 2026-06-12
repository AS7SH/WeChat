import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            trim: true,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },
        ImgURL: {
            type: String,
        },
        contentType: {
            type: String,
            enum: ["image", "text"],
        },
        reactions: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                type: String,
            },
        ],
    },
    { timestamps: true },
);

export const Message = mongoose.model("Message", messageSchema);
