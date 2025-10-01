import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados de Seguidor
 */
export interface NotificationData extends Document {
    userId: ObjectId | string;
    senderId: ObjectId | string;
    senderImage: string;
    title: string;
    content: string;
    href: string;
    type: "Comment" | "Vote" | "Follow";
    preview?: string;
}

/**
 * Schema principal do Seguidor
 */
const NotificationSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: [true, "User Id is required"],
        },
        senderId: {
            type: String,
            required: [true, "Sender Id is required"],
        },
        senderImage: {
            type: String,
            required: [true, "Sender photo is required"],
        },
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        href: {
            type: String,
            required: [true, "Href is required"],
        },
        type: {
            type: String,
            required: [true, "Type is required"],
            enum: ["Comment", "Vote", "Follow"],
        },
        preview: {
            type: String,
        },
    },
    { timestamps: true }
);

// Exporta o model Notification
export default mongoose.model<NotificationData>(
    "Notification",
    NotificationSchema
);
