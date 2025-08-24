import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados de Seguidor
 */
export interface FollowData extends Document {
    userId: ObjectId | string;
    followingId: string;
    followingName: string;
    followingPhoto: string;
}

/**
 * Schema principal do Seguidor
 */
const FollowSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: [true, "Following Id is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `User id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `User id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
        },
        followingId: {
            type: String,
            required: [true, "Follower Id is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `User id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `User id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
        },
        followingName: {
            type: String,
            required: [true, "Following name is required"],
            maxLength: [150, "Followingname must be less than 150 characters"],
        },
        followingPhoto: {
            type: String,
            required: [true, "Following photo is required"],
            maxLength: [200, "Following photo must be less than 200 characters"],
        },
    
    },
    { timestamps: true }
);

// Exporta o model Follow
export default mongoose.model<FollowData>("Follow", FollowSchema);
