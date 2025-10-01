import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados da Mensagem
 */
export interface MessageData extends Document {
    chatId: ObjectId | string;
    senderId: ObjectId | string;
    text: string;
    deleted: Record<string, boolean>
}

/**
 * Schema principal do Mensagem
 */
const MessageSchema: Schema = new Schema(
    {
        chatId: {
            type: String,
            required: [true, "Chat Id is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `Chat id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `Chat id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
        },
        senderId: {
            type: String,
            required: [true, "Sender Id is required"],
        },
        text: {
            type: String,
            required: [true, "Text is required"],
            maxLength: [150, "Text must be less than 150 characters"],
        },
        deleted: {
            type: Map,
            of: Boolean, 
            default: {},
        }
    
    },
    { timestamps: true }
);

// Exporta o model Message
export default mongoose.model<MessageData>("Message", MessageSchema);
