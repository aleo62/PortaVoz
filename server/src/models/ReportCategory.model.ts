import config from "@/config";
import mongoose, { Document, Schema } from "mongoose";

export interface ReportCategoryData extends Document {
    _id: string;
    title: string;
    desc: string;
    severity: number;
    type: "post" | "comment" | "user" | "all";
}

const ReportCategorySchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Category ID is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `Category ID must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `Category ID must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            immutable: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            unique: true,
            trim: true,
        },
        desc: {
            type: String,
            required: [true, "Description is required"],
        },
        severity: {
            type: Number,
            required: [true, "Severity is required"],
            min: [1, "Severity must be at least 1"],
            max: [5, "Severity must be at most 5"],
        },
        type: {
            type: String,
            enum: ["post", "comment", "user", "all"],
            default: "all",
            required: [true, "Type is required"],
        },
    },
    { timestamps: true }
);

const ReportCategory = mongoose.model<ReportCategoryData>(
    "ReportCategory",
    ReportCategorySchema
);
export default ReportCategory;
