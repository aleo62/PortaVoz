import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados de Seguidor
 */
export interface FollowData extends Document {
    followingId: ObjectId | string;
    followerId: ObjectId | string;
}

/**
 * Schema principal do Seguidor
 */
const FollowSchema: Schema = new Schema(
    {
        followingId: {
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
        followerId: {
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
    
    },
    { timestamps: true }
);

// Exporta o model Follow
export default mongoose.model<FollowData>("Follow", FollowSchema);
