import config from "@/config";
import Post from "@/models/Post.model";
import Repost from "@/models/Repost.model";
import { generateId } from "@/utils/generateId";

export const getRepostsByUserService = async (userId: string) => {
    return await Repost.find({ userId }).sort({ createdAt: -1 });
};

export const createRepostService = async (userId: string, postId: string) => {
    const exists = await Repost.exists({ userId, post: postId });
    if (exists) throw new Error("Post already reposted");

    await Repost.create({
        _id: generateId(config.SYSTEM_ID_SIZE, "RP_"),
        userId,
        post: postId,
    });

    await Post.findByIdAndUpdate(postId, {
        $inc: { repostsCount: 1 },
    });
};

export const deleteRepostService = async (userId: string, postId: string) => {
    const repost = await Repost.findOneAndDelete({ userId, post: postId });
    if (!repost) throw new Error("Repost not found");

    await Post.findByIdAndUpdate(postId, {
        $inc: { repostsCount: -1 },
    });

    return repost;
};
