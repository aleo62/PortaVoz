import config from "@/config";
import { fetchUid } from "@/firebase/fetchUid";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import Vote, { VoteData } from "@/models/Vote";
import { formatError } from "@/utils/formatError";
import { generateId } from "@/utils/generateId";
import { UserData } from "@/utils/types/userDataType";
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

        // Verifying if parent exists
        let parentDoc = await Comment.findById(parentId);
        let parentType;

        if (parentDoc) {
            parentType = "Comment";
        } else {
            parentDoc = await Post.findById(parentId);
            if (!parentDoc) throw new Error("Parent does not exist");

            parentType = "Post";
        }

        // Verifying if user exists
        const userData = (await fetchUid(uid)) as UserData;

        const _id = generateId(config.SYSTEM_ID_SIZE, "L_"),
            userId = userData._publicId,
            userPhoto = userData.image,
            userName = userData.fName;

        // Creating new comment
        const newUpvote = await Vote.create({
            _id,
            parentId,
            parentType,
            userId,
            userName,
            userPhoto,
        });

        // Editing parent Id
        if (parentType === "Comment") {
            await Comment.findByIdAndUpdate(parentId, {
                $inc: { upvotesCount: 1 },
            });
        } else {
            await Post.findByIdAndUpdate(parentId, {
                $inc: { upvotesCount: 1 },
            });
        }

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

        // Verifying if user exists
        const userData = (await fetchUid(uid)) as UserData;
        const userId = userData._publicId;

        // Removing Upvote
        const deletedUpvote = await Vote.findOneAndDelete({
            parentId,
            userId,
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

        res.status(201).json({ message: "Deleted Upvote", data: deleteUpvote });
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
