import config from "@/config";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ReportData extends Document {
    _id: string;
    category: ObjectId;
    user: string;
    reportedItemType: "post" | "user" | "comment";
    reportedItemId: string;
    desc: string;
    status: "pending" | "reviewed" | "resolved" | "dismissed";
}

const ReportSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Report ID is required"],
            maxLength: [
                config.SYSTEM_ID_SIZE,
                `Report ID must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            minLength: [
                config.SYSTEM_ID_SIZE,
                `Report ID must be ${config.SYSTEM_ID_SIZE} characters long`,
            ],
            immutable: true,
        },
        category: {
            type: String,
            ref: "ReportCategory",
            required: [true, "Category is required"],
        },
        user: {
            type: String,
            ref: "User",
            required: [true, "User is required"],
        },
        reportedItemType: {
            type: String,
            enum: {
                values: ["post", "user", "comment"],
                message: "{VALUE} is not a valid item type",
            },
            required: [true, "Reported item type is required"],
        },
        reportedItemId: {
            type: String,
            required: [true, "Reported item ID is required"],
        },
        desc: {
            type: String,
            maxLength: [500, "Description must be less than 500 characters"],
        },
        status: {
            type: String,
            enum: ["pending", "reviewed", "resolved", "dismissed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Report = mongoose.model<ReportData>("Report", ReportSchema);
export default Report;
