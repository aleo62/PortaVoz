import mongoose, { Document, Schema } from "mongoose";

export interface CommunityData extends Document {
    _id: string;
    name: string;
    description: string;
    image?: string;
    banner?: string;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    membersCount: number;
    idJoined?: boolean;
}

const CommunitySchema: Schema = new Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        banner: { type: String },
        isPrivate: { type: Boolean, default: false },
        membersCount: { type: Number, default: 1 },
    },
    { timestamps: true }
);

export default mongoose.model<CommunityData>("Community", CommunitySchema);
