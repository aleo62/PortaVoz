import Comment from "@/models/Comment";
import Post from "@/models/Post";

/**
 * Pega todos os comentarios de um parent.
 * @param parentId ID do parent dos comentarios
 */

/**
 * Deleta todos os comentarios de um parent.
 * @param parentId ID do parent dos comentarios
 */
export async function deleteByParentId(parentId: string) {
    try {
        const comment = await Comment.findById(parentId);

        if (comment) {
            await comment.updateOne({ repliesCount: 0 });
        } else {
            const post = await Post.findById(parentId);
            if (!post) throw new Error("Parent does not exist");

            await post.updateOne({ commentsCount: 0 });

            const commentsWithReplies = await Comment.find({
                parentId,
                repliesCount: { $gt: 0 },
            });
            commentsWithReplies.forEach(async (comment) => {
                await Comment.deleteMany({ parentId: comment._id });
            });
        }

        await Comment.deleteMany({ parentId });
        return;
    } catch (err) {
        console.error("Error deleting by parentId:", err);
        throw err;
    }
}
