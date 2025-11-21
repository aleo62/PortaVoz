import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface FavoriteData extends Document {
    _id: ObjectId | string;
    post: string;
    userId: string;
}

const FavoriteSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Id is required"],
        },
        post: {
            type: String,
            required: [true, "postId is required"],
        },
        userId: {
            type: String,
            required: [true, "userId is required"],
        },
    },
    { timestamps: true }
);

const Favorite = mongoose.model<FavoriteData>("Favorite", FavoriteSchema);
export default Favorite;
