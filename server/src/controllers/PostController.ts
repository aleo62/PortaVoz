import config from "@/config";
import Hashtag from "@/models/Hashtag.model";
import Post from "@/models/Post.model";
import { deleteByParentId } from "@/services/CommentService";
import { deleteImage, uploadImage } from "@/services/ImageService";
import {
    createPost,
    getPosts,
    getPostsByUserService,
    getSinglePost,
    PostListType,
} from "@/services/PostService";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = config.SYSTEM_POSTS_PER_PAGE;
        const { response: posts, count } = await getPosts(req, page, limit);

        res.status(200).json({
            posts,
            hasMore: count > page * limit,
            count,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const { response: post } = await getSinglePost(req);
        res.status(200).json({ post });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};

export const getPostByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const uid = req.user!.uid;
        const type = ((req.query.type as string | undefined)?.toLowerCase() ||
            "all") as PostListType;

        const { response: posts } = await getPostsByUserService(userId, type, uid);
        res.status(200).json({ posts });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};

export const createNewPost = async (req: Request, res: Response) => {
    try {
        const { newPost } = await createPost(req);

        res.status(201).json({ message: "New post created", data: newPost });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const postData = await Post.findById(postId);
        if (!postData) throw new Error("Post does not exist");

        await Promise.all(postData.images.map((url) => deleteImage(url)));
        await Promise.all(
            postData.hashtags.map(
                async (hashtag) =>
                    await Hashtag.findByIdAndUpdate(hashtag, {
                        $inc: { usageCount: -1 },
                    })
            )
        );
        await deleteByParentId(postId);
        await postData.deleteOne();

        res.status(200).json({ message: "Post deleted", data: postData });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const postData = await Post.findById(postId);
        if (!postData) throw new Error("Post does not exist");

        let imagesArray: string[] = [];
        if (Array.isArray(req.body.images))
            imagesArray = req.body.images.filter(Boolean);
        else if (typeof req.body.images === "string" && req.body.images !== "")
            imagesArray = [req.body.images];

        const uploadedImages: string[] = [];
        if (req.files && Array.isArray(req.files)) {
            const files = req.files as Express.Multer.File[];
            if (
                imagesArray.length + files.length > 3 ||
                imagesArray.length + files.length < 1
            )
                throw new Error("Inconsistent amount of images");

            const uploaded = await Promise.all(
                files.map((file) => uploadImage(file.path))
            );
            uploadedImages.push(...uploaded);

            await Promise.all(
                postData.images
                    .filter((url) => !imagesArray.includes(url))
                    .map((url) => deleteImage(url))
            );
        }

        const updatedFields = {
            ...req.body,
            images: [...imagesArray, ...uploadedImages],
        };

        const updatedPost = await postData.updateOne(updatedFields, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ message: "Post updated", data: updatedPost });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};
