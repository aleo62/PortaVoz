import mongoose, { Document, Schema } from "mongoose";

export interface FollowData extends Document {
    userId: string;
    follower: string;
}

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

const Follow = mongoose.model<FollowData>("Follow", FollowSchema);
export default Follow;