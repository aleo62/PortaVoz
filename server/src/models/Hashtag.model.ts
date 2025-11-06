import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface HashtagData extends Document {
    _id: ObjectId | string;
    usageCount: number;
    content: string;
}

const HashtagSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Id is required"],
        },
        usageCount: {
            type: Number,
            default: 0,
        },
        content: {
            type: String,
            required: [true, "text is required"],
        },
    },
    { timestamps: true }
);

const Hashtag = mongoose.model<HashtagData>("Hashtag", HashtagSchema);
export default Hashtag;