import mongoose, { Document, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados de Seguidor
 */
export interface FollowData extends Document {
    userId: string;
    follower: string;
}

/**
 * Schema principal do Seguidor
 */
const FollowSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: [true, "User Id is required"],
        },
        follower: {
            type: String,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Exporta o model Follow
export default mongoose.model<FollowData>("Follow", FollowSchema);
