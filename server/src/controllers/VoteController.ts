import config from "@/config";
import Comment from "@/models/Comment.model";
import Post from "@/models/Post.model";
import { UserData } from "@/models/User.model";
import Vote from "@/models/Vote.model";
import { sendNotificationToUser } from "@/services/NotificationService";
import { fetchUser } from "@/services/UserService";
import { formatError } from "@/utils/formatError";
import { generateId } from "@/utils/generateId";
import { Request, Response } from "express";

/**
 * POST - Fazer Upvote
 */
export const createUpvote = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No user provided");
        const { uid } = req.user;

        if (!req.params.parentId) throw new Error("Parent Id is required");
        const parentId = req.params.parentId;
        let notificationPreview;

        // Verifying if parent exists
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

        // Verifying if user exists
        const alreadyUpvoted = await Vote.find({
            parentId: parentDoc._id,
            user: uid,
        });

        if (alreadyUpvoted.length > 0)
            throw new Error("You have already upvoted this Post");

        const _id = generateId(config.SYSTEM_ID_SIZE, "L_") as string;

        // Creating new comment
        const newUpvote = await Vote.create({
            _id,
            parentId,
            parentType,
            user: uid,
        });

        // Incrementing the upvotes count on the parent document
        parentDoc.upvotesCount = (parentDoc.upvotesCount || 0) + 1;
        await parentDoc.save();

        const senderData = await fetchUser(uid);
        // Sending notification:
        await sendNotificationToUser({
            userId: parentDoc.user,
            senderId: uid,
            senderImage: senderData.image,
            title: `${senderData.username} te deu upvote!`,
            content: `Você conseguiu um novo upvote em seu ${ parentType === "Comment" ? "comentário" : "post" }`,
            href: `/post/${parentHref}`,
            type: "Vote",
            preview: undefined,
        });

        res.status(201).json({ message: "Post Upvoted", data: newUpvote });
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};

/**
 * DELETE - Tirar Upvote
 */
export const deleteUpvote = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No user provided");
        const { uid } = req.user;

        if (!req.params.parentId) throw new Error("Parent Id is required");
        const parentId = req.params.parentId;

        // Removing Upvote
        const deletedUpvote = await Vote.findOneAndDelete({
            parentId,
            user: uid,
        });
        if (!deletedUpvote) throw new Error("Upvote not found");

        // Editing parent Id
        if (deletedUpvote.parentType === "Comment") {
            await Comment.findByIdAndUpdate(parentId, {
                $inc: { upvotesCount: -1 },
            });
        } else {
            await Post.findByIdAndUpdate(parentId, {
                $inc: { upvotesCount: -1 },
            });
        }

        res.status(200).json({ message: "Deleted Upvote", data: deleteUpvote });
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};
