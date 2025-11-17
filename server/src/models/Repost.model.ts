import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface RepostData extends Document {
    _id: ObjectId | string;
    participants: string[];
    visible: Map<string, boolean>;
}

const RepostSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Id is required"],
        },
        post: {
            type: String,
            required: [true, "postId is required"],
        },
        userId: {
            type: String,
            required: [true, "postId is required"],
        },
    },
    { timestamps: true }
);

const Repost = mongoose.model<RepostData>("Repost", RepostSchema);
export default Repost;
