import config from "@/config";
import mongoose, { Document, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados de users counters
 */
export interface UserCountersData extends Document {
    userId: string;
    followers: number;
    following: number;
    unreadNotifications: number;
}

/**
 * Schema principal do User counters
 */
const UserCountersSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: [true, "User Id is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `User id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `User id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            imutable: true
        },
        followers: {
            type: Number,
        },
        following: {
            type: Number,
        },
        unreadNotifications: {
            type: Number,
        },
        
    },
    { timestamps: true }
);

// Exporta o model Post
export default mongoose.model<UserCountersData>("UserCounters", UserCountersSchema);
