import config from "@/config";
import { fetchUid } from "@/firebase/fetchUid";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { deleteByParentId } from "@/services/CommentService";
import { formatError } from "@/utils/formatError";
import { generateId } from "@/utils/generateId";
import { UserData } from "@/utils/types/userDataType";
import { Request, Response } from "express";

/**
 * POST - Controller responsável por criar um novo comentario.
 */
export const createComment = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        let parentDoc, parentType;
        if (!req.user) throw new Error("No user provided");

        const { uid } = req.user;
        const { parentId, content } = req.body;

        // Verifying if parent exists
        parentDoc = await Comment.findById(parentId);

        if (parentDoc) {
            parentType = "Comment";
        } else {
            parentDoc = await Post.findById(parentId);
            if (!parentDoc) throw new Error("Parent does not exist");

            parentType = "Post";
        }

        // Verifying if user exists
        const userData = (await fetchUid(uid)) as UserData;

        const _id = generateId(config.SYSTEM_ID_SIZE, "C_"),
            userId = userData._publicId,
            userPhoto = userData.image,
            userName = userData.fName;

        // Creating new comment
        const newComment = await Comment.create({
            _id,
            parentId,
            parentType,
            userId,
            userName,
            userPhoto,
            content,
        });

        // Editing parent Id
        if (parentType === "Comment") {
            await Comment.findByIdAndUpdate(parentId, {
                $push: { replies: _id },
                $inc: { commentsCount: 1 },
            });
        } else {
            await Post.findByIdAndUpdate(parentId, {
                $push: { comments: _id },
                $inc: { commentsCount: 1 },
            });
        }

        res.status(201).json({
            message: "New comment created",
            data: newComment,
        });
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
 * DEL - Controller responsável por deletar um comentario.
 */
export const deleteComment = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.params.commentId) throw new Error("Comment ID not informed");
        const commentId = req.params.commentId;

        const commentData = await Comment.findByIdAndDelete(commentId);
        if (!commentData) throw new Error("Comment does not exist");

        await Post.findByIdAndUpdate(commentData.parentId, {
            $pull: { comments: commentId },
            $inc: { repliesCount: -1 },
        });

        res.status(200).json({ message: "Comment deleted", data: commentData });
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
 * DEL - Controller responsável por deletar todos os comentarios do parent.
 */
export const deleteCommentByParentId = async (req: Request, res: Response) => {
    try {
        const parentId = req.params.parentId;

        if (!Comment.find({ parentId }))
            throw new Error("No Comment/Reply found with this Parent ID");

        await deleteByParentId(parentId);
        res.status(200).json({
            message: `All comments children of ${parentId} deleted`,
        });
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
 * PUT - Controller responsável por atualizar um comentario.
 */
export const updateComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.commentId;
        const updatedInfo = req.body;

        let commentData = await Comment.findByIdAndUpdate(
            commentId,
            updatedInfo,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!commentData) throw new Error("Comment does not exist");

        res.status(200).json({
            message: `Comment Updated`,
            data: commentData,
        });
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
