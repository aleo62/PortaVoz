import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface SaveData extends Document {
    _id: ObjectId | string;
    post: string;
    userId: string;
}

const SaveSchema: Schema = new Schema(
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
            required: [true, "userId is required"],
        },
    },
    { timestamps: true }
);

const Save = mongoose.model<SaveData>("Save", SaveSchema);
export default Save;
