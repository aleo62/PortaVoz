import Repost from "@/models/Repost.model"

export const getRepostsByUserService = () => {}

export const createRepostService = async (userId: string, postId: string) => {
    const exists = await Repost.exists({userId, postId});
    if(exists) throw new Error("Post already reposted")

    await Repost.create(userId, postId);
}

export const deleteRepostService = () => {

}