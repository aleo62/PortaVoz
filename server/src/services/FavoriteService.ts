import config from "@/config";
import Favorite from "@/models/Favorite.model";
import { generateId } from "@/utils/generateId";

export const getFavoritesByUserService = async (userId: string) => {
    return await Favorite.find({ userId }).sort({ createdAt: -1 });
};

export const createFavoriteService = async (userId: string, postId: string) => {
    const exists = await Favorite.exists({ userId, post: postId });
    if (exists) throw new Error("Post already favorited");

    await Favorite.create({
        _id: generateId(config.SYSTEM_ID_SIZE, "FV_"),
        userId,
        post: postId,
    });
};

export const deleteFavoriteService = async (userId: string, postId: string) => {
    const favorite = await Favorite.findOneAndDelete({ userId, post: postId });
    if (!favorite) throw new Error("Favorite not found");

    return favorite;
};
