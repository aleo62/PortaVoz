import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados da Chat
 */
export interface ChatData extends Document {
    _id: ObjectId | string;
    participants: string[2];
    participantsIndex: Record<string, "userA" | "userB">;
    participantsPhotos: Record<string, string>;
    participantsNames: Record<string, string>;
}

/**
 * Schema principal do Chat
 */
const ChatSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Id is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
        },
        participants: {
            type: [String], 
            required: true,
        },
        participantsPhotos: {
            type: Map,
            of: String, 
            default: {},
        },
        participantsNames: {
            type: Map,
            of: String, 
            default: {},
        },
    },
    { timestamps: true }
);
// Exporta o model Chat
export default mongoose.model<ChatData>("Chat", ChatSchema);
