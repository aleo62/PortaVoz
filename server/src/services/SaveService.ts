import config from "@/config";
import Save from "@/models/Save.model";
import { generateId } from "@/utils/generateId";
import { getPostsByIds } from "./PostService";

export const getSavesByUserService = async (
    userId: string,
    page: number,
    limit: number,
    uid: string
) => {
    const saves = await Save.find({ userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const postIds = saves.map((fav) => fav.post);

    const { response } = await getPostsByIds(postIds, uid);

    return { saves: response, hasMore: saves.length === limit };
};

export const createSaveService = async (userId: string, postId: string) => {
    const exists = await Save.exists({ userId, post: postId });
    if (exists) throw new Error("Post already saved");

    await Save.create({
        _id: generateId(config.SYSTEM_ID_SIZE, "SV_"),
        userId,
        post: postId,
    });
};

export const deleteSaveService = async (userId: string, postId: string) => {
    const save = await Save.findOneAndDelete({ userId, post: postId });
    if (!save) throw new Error("Save not found");

    return save;
};
