import config from "@/config";
import Comment from "@/models/Comment.model";
import Post from "@/models/Post.model";
import Vote from "@/models/Vote.model";
import { deleteByParentId } from "@/services/CommentService";
import { sendNotificationToUser } from "@/services/NotificationService";
import { generateId } from "@/utils/generateId";
import { NextFunction, Request, Response } from "express";

export const getCommentsById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");
        const { parentId } = req.params;

        const page = Number(req.query.page) === 0 ? 1 : Number(req.query.page),
            limit = config.SYSTEM_COMMENTS_PER_PAGE;

        const commentsData = await Comment.find({ parentId })
            .populate("user", "username image")
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await Comment.countDocuments({ parentId });

        const commentsResponse = await Promise.all(
            commentsData.map(async (comment) => {
                const isUpvoted = await Vote.findOne({
                    parentId: comment._id,
                    user: req.user?.uid,
                    parentType: "Comment",
                });

                return {
                    ...comment.toObject(),
                    isUpvoted: !!isUpvoted,
                };
            })
        );

        res.status(200).json({
            comments: commentsResponse,
            hasMore: count > page * limit,
        });
    } catch (err) {
        next(err);
    }
};

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let parentDoc, parentType, parentHref;
        if (!req.user) throw new Error("No user provided");

        const { uid } = req.user;
        const { parentId, content } = req.body;

        parentDoc = await Comment.findById(parentId);

        if (parentDoc) {
            parentType = "Comment";
            parentHref = parentDoc.parentId;
        } else {
            parentDoc = await Post.findById(parentId);
            if (!parentDoc) throw new Error("Parent does not exist");

            parentType = "Post";
            parentHref = parentId;
        }

        const _id = generateId(config.SYSTEM_ID_SIZE, "C_");
        const newComment = await Comment.create({
            _id,
            parentId,
            parentType,
            content,
            user: uid,
        });

        if (parentType === "Comment") {
            const parent = await Comment.findByIdAndUpdate(parentId, {
                $inc: { repliesCount: 1 },
            });
            await Post.findByIdAndUpdate(parent?.parentId, {
                $inc: { commentsCount: 1 },
            });
        } else {
            await Post.findByIdAndUpdate(parentId, {
                $inc: { commentsCount: 1 },
            });
        }

        await sendNotificationToUser({
            userId: parentDoc.user,
            sender: uid,
            href: `/post/${parentHref}`,
            type: "Comment",
            preview: content,
        });

        res.status(201).json({
            message: "New comment created",
            data: newComment,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.params.commentId) throw new Error("Comment ID not informed");
        const commentId = req.params.commentId;

        const commentData = await Comment.findByIdAndDelete(commentId);
        if (!commentData) throw new Error("Comment does not exist");

        const parentId = commentData.parentId;

        if (commentData.parentType === "Comment") {
            const parent = await Comment.findByIdAndUpdate(parentId, {
                $inc: { repliesCount: -1 },
            });
            await Post.findByIdAndUpdate(parent?.parentId, {
                $inc: { commentsCount: -1 },
            });
        } else {
            await Post.findByIdAndUpdate(parentId, {
                $inc: { commentsCount: -(commentData.repliesCount + 1) },
            });
        }

        res.status(200).json({ message: "Comment deleted", data: commentData });
    } catch (err) {
        next(err);
    }
};

export const deleteCommentByParentId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parentId = req.params.parentId;

        if (!Comment.find({ parentId }))
            throw new Error("No Comment/Reply found with this Parent ID");

        await deleteByParentId(parentId);
        res.status(200).json({
            message: `All comments children of ${parentId} deleted`,
        });
    } catch (err) {
        next(err);
    }
};
export const updateComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
        next(err);
    }
};
