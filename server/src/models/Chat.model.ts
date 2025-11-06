import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ChatData extends Document {
    _id: ObjectId | string;
    participants: string[];
    visible: Map<string, boolean>;
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
    },
    { timestamps: true }
);

const Chat = mongoose.model<ChatData>("Chat", ChatSchema);
export default Chat;