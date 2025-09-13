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
        participantsIndex: {
            type: Map,
            of: String,
            default: {},
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
