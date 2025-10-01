import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados de comentario
 */
export interface CommentData extends Document {
    _id: ObjectId;
    parentId: ObjectId | string;
    parentType: "Post" | "Comment";
    user: string;
    content: string;
    upvotesCount: number;
    repliesCount: number;
}

/**
 * Schema principal do Comentario
 */
const CommentSchema: Schema = new Schema(
    {
        _id: {
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
            imutable: true,
        },
        parentId: {
            type: String,
            required: [true, "Parent Id is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `Parent id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `Parent id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
        },
        parentType: {
            type: String,
            required: [true, "Parent Type is required"],
            enum: ["Post", "Comment"],
        },
        user: {
            type: String,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: [true, "Comment content is required"],
            maxLength: [50, "Comment content must be less than 150 characters"],
        },
        upvotesCount: {
            type: Number,
            default: 0,
        },
        repliesCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Exporta o model Comment
export default mongoose.model<CommentData>("Comment", CommentSchema);
