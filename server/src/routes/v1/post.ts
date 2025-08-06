// Roteador de posts: define endpoint para criação de post
import config from "@/config";
import {
    createComment,
    deleteComment,
    deleteCommentByParentId,
    getCommentsById,
    updateComment,
} from "@/controllers/CommentsController";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    getPostByUser,
    updatePost,
} from "@/controllers/PostController";
import { createUpvote, deleteUpvote } from "@/controllers/VoteController";
import upload from "@/lib/multer";
import { authenticateUser } from "@/middlewares/auth";
import { authenticateOwnerOrAdmin } from "@/middlewares/authOwnerOrAdmin";
import { validationError } from "@/middlewares/validationError";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

// * POSTS ROUTES -----------------------------------------------------------------------------------
// GET - Rota para ver todos os posts
router.get("/", authenticateUser, validationError, getAllPosts);

// GET - Rota para ver todos os posts de um user
router.get("/user/:userId", authenticateUser, validationError, getPostByUser);

// GET - Rota para ver todos o post pelo ID
router.get("/:postId", authenticateUser, validationError, getPostById);

// POST - Rota para criar um novo post
router.post(
    "/",
    authenticateUser,
    upload.array("images", 3),
    body("title").trim().notEmpty().withMessage("title is required"),
    body("desc").trim().notEmpty().withMessage("desc is required"),
    body("tags").notEmpty().withMessage("tags are required"),
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
    validationError,
    createPost
);

// DEL - Rota para deletar um post
router.delete(
    "/:postId",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req) => {
        const post = await Post.findById(req.params.postId);
        if (!post) throw new Error("Post does not exist");
        return post?.userId;
    }),
    deletePost
);

// PUT - Rota para atualizar um post
router.put(
    "/:postId",
    authenticateUser,
    upload.array("newImages", 3),
    body("title").optional().trim().notEmpty().withMessage("title is required"),
    body("desc").optional().trim().notEmpty().withMessage("desc is required"),
    body("tags").optional().notEmpty().withMessage("tags are required"),
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
    authenticateOwnerOrAdmin(async (req) => {
        const post = await Post.findById(req.params.postId);
        if (!post) throw new Error("Post does not exist");
        return post?.userId;
    }),
    validationError,
    updatePost
);

// * COMMENTS ROUTES -----------------------------------------------------------------------------------

// GET - Rota para ver todos os comentarios de um post
router.get("/:parentId/comments", authenticateUser, validationError, getCommentsById);

// POST - Rota para adicionar comentario
router.post(
    "/comments",
    authenticateUser,
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

// DEL - Rota para deletar um comentario
router.delete(
    "/comments/:commentId",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req) => {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) throw new Error("Comment does not exist");
        return comment?.userId;
    }),
    validationError,
    deleteComment
);

// DEL - Rota para deletar todos os comentarios/respostas de um Post/Comentario
router.delete(
    "/comments/parent/:parentId",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req) => {
        const post = await Post.findById(req.params.parentId);
        return post?.userId;
    }),
    validationError,
    deleteCommentByParentId
);

// PUT - Rota para atualizar um comentario
router.put(
    "/comments/:commentId",
    authenticateUser,
    body().whitelist("userName"),
    body("userName")
        .optional()
        .notEmpty()
        .withMessage("userName can not be empty"),
    body("userPhoto")
        .optional()
        .notEmpty()
        .withMessage("userName can not be empty"),
    body("content")
        .optional()
        .notEmpty()
        .withMessage("userName can not be empty"),
    authenticateOwnerOrAdmin(async (req) => {
        const comment = await Comment.findById(req.params.parentId);
        if (!comment) throw new Error("Comment does not exist");
        return comment?.userId;
    }),
    validationError,
    updateComment
);

export default router;

// * VOTESS ROUTES -----------------------------------------------------------------------------------

// POST - Rota para adicionar um upvote
router.post(
    "/:parentId/upvote",
    authenticateUser,
    validationError,
    createUpvote
);

// DEL - Rota para deletar um upvote
router.delete(
    "/:parentId/desupvote",
    authenticateUser,
    validationError,
    deleteUpvote
);
