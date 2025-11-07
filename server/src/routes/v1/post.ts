// Roteador de posts: define endpoint para criação de post
import config from "@/config";
import {
    createComment,
    deleteComment,
    deleteCommentByParentId,
    getCommentsById,
    updateComment,
} from "@/controllers/CommentController";
import {
    createNewPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} from "@/controllers/PostController";
import { createUpvote, deleteUpvote } from "@/controllers/VoteController";
import upload from "@/lib/multer";
import { authenticateOwnerOrAdmin } from "@/middlewares/authOwnerOrAdmin";
import { authenticateUser } from "@/middlewares/authUser";
import { authenticateVerified } from "@/middlewares/authVerified";
import { validationError } from "@/middlewares/validationError";
import { validationFile } from "@/middlewares/validationFile";
import Comment from "@/models/Comment.model";
import Post from "@/models/Post.model";
import { Request, Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get("/", authenticateUser, validationError, getAllPosts);
router.get("/:postId", authenticateUser, validationError, getPostById);

router.post(
    "/",
    authenticateUser,
    authenticateVerified,
    upload.array("images", 3),
    body("title").trim().notEmpty().withMessage("title is required"),
    body("desc").trim().notEmpty().withMessage("desc is required"),
    body("hashtags").notEmpty().withMessage("hashtags are required"),
    body("location").isObject().withMessage("location is required"),
    body("location[longitude]")
        .notEmpty()
        .withMessage("longitude is required")
        .isFloat({ min: -180, max: 180 })
        .withMessage("longitude must be between -180 and 180"),
    body("location[latitude]")
        .notEmpty()
        .withMessage("latitude is required")
        .isFloat({ min: -90, max: 90 })
        .withMessage("latitude must be between -90 and 90"),
    body("address").trim().notEmpty().withMessage("address is required"),
    body("status")
        .optional()
        .isIn(["ativo", "resolvido", "oculto"])
        .withMessage("status not supported"),
    validationFile(3, 1 * 1024 * 1920, /jpeg|jpg|png/),
    validationError,
    createNewPost
);

router.delete(
    "/:postId",
    authenticateUser,
    authenticateVerified,
    authenticateOwnerOrAdmin(async (req: Request) => {
        const post = await Post.findById(req.params.postId);
        if (!post) throw new Error("Post does not exist");
        return post?.user as string;
    }),
    deletePost
);

router.put(
    "/:postId",
    authenticateUser,
    authenticateVerified,
    upload.array("newImages", 3),
    body("title").optional().trim().notEmpty().withMessage("title is required"),
    body("desc").optional().trim().notEmpty().withMessage("desc is required"),
    body("hashtags").optional().notEmpty().withMessage("hashtags are required"),
    body("location").optional().isObject().withMessage("location is required"),
    body("location[longitude]")
        .optional()
        .notEmpty()
        .withMessage("longitude is required")
        .isFloat({ min: -180, max: 180 })
        .withMessage("longitude must be between -180 and 180"),
    body("location[latitude]")
        .optional()
        .notEmpty()
        .withMessage("latitude is required")
        .isFloat({ min: -90, max: 90 })
        .withMessage("latitude must be between -90 and 90"),
    body("address")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("address is required"),
    authenticateOwnerOrAdmin(async (req: Request) => {
        const post = await Post.findById(req.params.postId);
        if (!post) throw new Error("Post does not exist");
        return post?.user as string;
    }),
    validationError,
    updatePost
);

router.get(
    "/:parentId/comments",
    authenticateUser,
    validationError,
    getCommentsById
);

router.post(
    "/comments",
    authenticateUser,
    authenticateVerified,
    body("parentId")
        .trim()
        .notEmpty()
        .withMessage("parentId is required")
        .isLength({ min: config.SYSTEM_ID_SIZE, max: config.SYSTEM_ID_SIZE })
        .withMessage(
            `parentId must be ${config.SYSTEM_ID_SIZE} characters long`
        ),
    body("content").trim().notEmpty().withMessage("content is required"),
    validationError,
    createComment
);

router.delete(
    "/comments/:commentId",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) throw new Error("Comment does not exist");
        return comment?.user as string;
    }),
    validationError,
    deleteComment
);

router.delete(
    "/comments/parent/:parentId",
    authenticateUser,
    authenticateVerified,
    authenticateOwnerOrAdmin(async (req: Request) => {
        const post = await Post.findById(req.params.parentId);
        return post?.user as string;
    }),
    validationError,
    deleteCommentByParentId
);

router.put(
    "/comments/:commentId",
    authenticateUser,
    authenticateVerified,
    body().whitelist("userName"),
    body("userName")
        .optional()
        .notEmpty()
        .withMessage("userName can not be empty"),
    body("userImage")
        .optional()
        .notEmpty()
        .withMessage("userName can not be empty"),
    body("content")
        .optional()
        .notEmpty()
        .withMessage("userName can not be empty"),
    authenticateOwnerOrAdmin(async (req: Request) => {
        const comment = await Comment.findById(req.params.parentId);
        if (!comment) throw new Error("Comment does not exist");
        return comment?.user as string;
    }),
    validationError,
    updateComment
);

export default router;

router.post(
    "/:parentId/upvote",
    authenticateUser,
    authenticateVerified,
    validationError,
    createUpvote
);

// DEL - Rota para deletar um upvote
router.delete(
    "/:parentId/desupvote",
    authenticateUser,
    authenticateVerified,
    validationError,
    deleteUpvote
);
