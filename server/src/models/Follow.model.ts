import mongoose, { Document, Schema } from "mongoose";

export interface FollowData extends Document {
    following: string;
    follower: string;
}

const FollowSchema: Schema = new Schema(
    {
        following: {
            type: String,
            ref: "User",
            required: [true],
        },
        follower: {
            type: String,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Follow = mongoose.model<FollowData>("Follow", FollowSchema);
export default Follow;