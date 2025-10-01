import mongoose, { Document, Schema } from "mongoose";

export interface UserData extends Document {
_id: string;
username: string;
email: string;
fName: string;
lName: string;
image: string;
about?: string;
banner?: string;
meta: {
    counters: {
        followers: number;
        following: number;
        unreadNotifications: number;
    };
    limits: {
        remainingReports: number;
        reportsResetAt: Date;
        totalReports: number;
    };
};
}

export interface PublicUserData {
_id: string;
username: string;
fName: string;
lName: string;
image: string;
about?: string;
banner?: string;
meta: {
    counters: {
        followers: number;
        following: number;
    };
};
}

const UserSchema: Schema = new Schema(
{
    _id: {
        type: String,
        required: [true, "Id is required"],
    },

    username: { type: String, required: true },
    email: { type: String, required: true },
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    image: {
        type: String,
        default:
            "https://res.cloudinary.com/di5bma0gm/image/upload/v1758557907/default_image_wroapp.jpg",
    },
    about: { type: String, default: "" },
    banner: { type: String, default: "" },
    meta: {
        counters: {
            followers: { type: Number, default: 0 },
            following: { type: Number, default: 0 },
            unreadNotifications: { type: Number, default: 0 },
        },
        limits: {
            remainingReports: { type: Number, default: 2 },
            reportsResetAt: { type: Date, default: new Date(0) },
            totalReports: { type: Number, default: 0 },
        },
    },
},
{ timestamps: true }
);

export default mongoose.model<UserData>("User", UserSchema);
