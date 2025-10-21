import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados da Hashtag
 */
export interface HashtagData extends Document {
    _id: ObjectId | string;
    usageCount: number;
    content: string;
}

/**
 * Schema principal do Hashtag
 */
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
// Exporta o model Hashtag
export default mongoose.model<HashtagData>("Hashtag", HashtagSchema);
