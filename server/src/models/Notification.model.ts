import mongoose, { Document, Schema } from "mongoose";

export interface NotificationData extends Document {
    userId: string;
    sender: string;
    href: string;
    type: "Comment" | "Vote" | "Follow";
    preview?: string;
    read: boolean;
}

const NotificationSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: [true, "User Id is required"],
        },
        sender: {
            type: String,
            required: [true, "Sender is required"],
            ref: "User",
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
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model<NotificationData>(
    "Notification",
    NotificationSchema
);
export default Notification;
