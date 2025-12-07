import mongoose, { Document, Schema } from "mongoose";

export interface CommunityMembershipData extends Document {
    userId: string;
    communityId: string;
    role: "member" | "moderator";
    joinedAt: Date;
}

const CommunityMembershipSchema: Schema = new Schema(
    {
        userId: { type: String, ref: "User", required: true },
        communityId: { type: String, ref: "Community", required: true },
        role: { type: String, enum: ["member", "moderator"], default: "member" },
        joinedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

CommunityMembershipSchema.index({ userId: 1, communityId: 1 }, { unique: true });

export default mongoose.model<CommunityMembershipData>("CommunityMembership", CommunityMembershipSchema);
