import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface LocationData {
    latitude: number;
    longitude: number;
}

export interface DraftData extends Document {
    _id: ObjectId | string;
    user: string;
    title?: string;
    desc?: string;
    images?: string[];
    hashtags?: string[];
    location?: LocationData;
    address?: string;
    status?: "ativo" | "resolvido" | "oculto";
}

const LocationSchema: Schema = new Schema({
    latitude: {
        type: Number,
        min: [-90, "Min of -90 degrees"],
        max: [90, "Max of 90 degrees"],
    },
    longitude: {
        type: Number,
        min: [-180, "Min of -180 degrees"],
        max: [180, "Max of 180 degrees"],
    },
});

const DraftSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Id is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `Draft id must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `Draft id must be ${config.SYSTEM_ID_SIZE} characters long`,
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
            maxLength: [50, "Draft title must be less than 50 characters"],
        },
        desc: {
            type: String,
            maxLength: [
                500,
                "Draft description must be less than 500 characters",
            ],
        },
        images: {
            type: [String],
            validate: [
                (val: string[]) => !val || val.length <= 3,
                "Images must have at most 3 items",
            ],
        },
        hashtags: {
            type: [String],
            ref: "Hashtag",
            validate: [
                (val: string[]) => !val || val.length <= 3,
                "Tags must have at most 3 items",
            ],
        },
        location: {
            type: LocationSchema,
        },
        address: {
            type: String,
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

const Draft = mongoose.model<DraftData>("Draft", DraftSchema);
export default Draft;

