import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

/**
 * Interfaces para tipagem dos dados de comentario
 */
export interface CommentData extends Document {
    _id: ObjectId;
    parentId: ObjectId | string;
    parentType: "Post" | "Comment";
    userId: string;
    userName: string;
    userPhoto: string;
    content: string;
    upvotesCount: number;
    repliesCount: number;
    replies: ObjectId[] | string[];
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
        userId: {
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
        },
        userName: {
            type: String,
            required: [true, "Username is required"],
            maxLength: [150, "Username must be less than 150 characters"],
        },
        userPhoto: {
            type: String,
            required: [true, "User photo is required"],
            maxLength: [200, "User photo must be less than 200 characters"],
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
        replies: [{ type: String, ref: "Comment" }],
    },
    { timestamps: true }
);

// Exporta o model Post
export default mongoose.model<CommentData>("Comment", CommentSchema);
