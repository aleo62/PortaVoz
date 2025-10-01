import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados da Chat
 */
export interface ChatData extends Document {
    _id: ObjectId | string;
    participants: string[];
    visible: Map<string, boolean>;
}

/**
 * Schema principal do Chat
 */
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
// Exporta o model Chat
export default mongoose.model<ChatData>("Chat", ChatSchema);
