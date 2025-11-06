import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface LocationData {
    latitude: number;
    longitude: number;
}

export interface PostData extends Document {
    _id: ObjectId;
    user: string;
    title: string;
    desc: string;
    images: string[];
    hashtags: string[];
    location: LocationData;
    address: string;
    upvotesCount: number;
    commentsCount: number;
    status: "ativo" | "resolvido" | "oculto";
    isUpvoted?: boolean;
}

const LocationSchema: Schema = new Schema({
    latitude: {
        type: Number,
        required: [true, "Latitude is required"],
        min: [-90, "Min of -90 degrees"],
        max: [90, "Max of 90 degrees"],
    },
    longitude: {
        type: Number,
        required: [true, "Longitude is required"],
        min: [-180, "Min of -180 degrees"],
        max: [180, "Max of 180 degrees"],
    },
});

const PostSchema: Schema = new Schema(
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
        user: {
            type: String,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: [true, "Post title is required"],
            maxLength: [50, "Post title must be less than 50 characters"],
        },
        desc: {
            type: String,
            required: [true, "Post description is required"],
            maxLength: [
                500,
                "Post description must be less than 500 characters",
            ],
        },
        images: {
            type: [String],
            required: true,
            validate: [
                (val: string[]) => val.length >= 1 && val.length <= 3,
                "Images must have between 1 and 3 items",
            ],
        },
        hashtags: {
            type: [String],
            ref: "Hashtag",
            required: true,
            validate: [
                (val: string[]) => val.length >= 1 && val.length <= 3,
                "Tags must have between 1 and 3 items",
            ],
        },
        location: {
            type: LocationSchema,
            required: [true, "Latitude and Longitude is required"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        upvotesCount: {
            type: Number,
            default: 0,
        },
        commentsCount: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: {
                values: ["ativo", "resolvido", "oculto"],
                message: ["{VALUE} is not supported"],
            },
            default: "ativo",
        },
    },
    { timestamps: true }
);


const Post = mongoose.model<PostData>("Post", PostSchema);
export default Post;