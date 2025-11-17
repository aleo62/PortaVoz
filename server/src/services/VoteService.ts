import config from "@/config";
import Comment from "@/models/Comment.model";
import Post from "@/models/Post.model";
import Vote from "@/models/Vote.model";
import { generateId } from "@/utils/generateId";
import { sendNotificationToUser } from "./NotificationService";

export const createUpvoteService = async (uid: string, parentId: string) => {
    let parentDoc = await Comment.findById(parentId);
    let parentType, parentHref;

    if (parentDoc) {
        parentType = "Comment";
        parentHref = parentDoc.parentId;
    } else {
        parentDoc = await Post.findById(parentId);
        if (!parentDoc) throw new Error("Parent does not exist");

        parentType = "Post";
        parentHref = parentDoc.parentId;
    }

    const alreadyUpvoted = await Vote.find({
        parentId: parentDoc._id,
        user: uid,
    });

    if (alreadyUpvoted.length > 0)
        throw new Error("You have already upvoted this Post");

    const _id = generateId(config.SYSTEM_ID_SIZE, "L_") as string;
    await Vote.create({
        _id,
        parentId,
        parentType,
        user: uid,
    });

    parentDoc.upvotesCount = (parentDoc.upvotesCount || 0) + 1;
    await parentDoc.save();

    await sendNotificationToUser({
        userId: parentDoc.user,
        sender: uid,
        href: `/post/${parentHref}`,
        type: "Vote",
        preview: undefined,
    });
};

export const deleteUpvoteService = async (uid: string, parentId: string) => {
    const deletedUpvote = await Vote.findOneAndDelete({
        parentId,
        user: uid,
    });
    if (!deletedUpvote) throw new Error("Upvote not found");

    if (deletedUpvote.parentType === "Comment") {
        await Comment.findByIdAndUpdate(parentId, {
            $inc: { upvotesCount: -1 },
        });
    } else {
        await Post.findByIdAndUpdate(parentId, {
            $inc: { upvotesCount: -1 },
        });
    }
};
