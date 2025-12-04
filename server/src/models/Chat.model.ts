import mongoose, { Document, Schema } from "mongoose";

export interface ChatData extends Document {
    _id: string;
    participants: string[];
    visible: Map<string, boolean>;
    unreadCounts: Map<string, number>;
    recentMessage?: string;
}

const ChatSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Id is required"],
        },
        participants: {
            type: [String],
            ref: "User",
            required: true,
        },
        visible: {
            type: Map,
            of: Boolean,
            default: {},
        },
        unreadCounts: {
            type: Map,
            of: Number,
            default: {},
        },
        recentMessage: {
            type: String,
            ref: "Message",
            required: false,
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model<ChatData>("Chat", ChatSchema);
export default Chat;
