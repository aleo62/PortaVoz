import config from "@/config";
import Hashtag from "@/models/Hashtag.model";
import Post from "@/models/Post.model";
import User from "@/models/User.model";
import { deleteByParentId } from "@/services/CommentService";
import { deleteImage, uploadImage } from "@/services/ImageService";
import {
    createPost,
    getCommunityPostsService,
    getPosts,
    getPostsByUserService,
    getSinglePost,
    PostListType,
} from "@/services/PostService";
import { NextFunction, Request, Response } from "express";

export const getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = config.SYSTEM_POSTS_PER_PAGE;
        const { response: posts, count } = await getPosts(
            req.user!,
            req.query,
            page,
            limit
        );

        res.status(200).json({
            posts,
            hasMore: count > page * limit,
            count,
        });
    } catch (err) {
        next(err);
    }
};

export const getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { response: post } = await getSinglePost(req);
        res.status(200).json({ post });
    } catch (err) {
        next(err);
    }
};

export const getPostByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;
        const uid = req.user!.uid;
        const type = ((req.query.type as string | undefined)?.toLowerCase() ||
            "all") as PostListType;

        const { response: posts } = await getPostsByUserService(
            userId,
            type,
            uid
        );
        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
};

export const createNewPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { newPost } = await createPost(req);

        res.status(201).json({ message: "New post created", data: newPost });
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
        await User.findByIdAndUpdate(req.user!.uid, {
            $inc: { "meta.counters.postsCount": -1 },
        });

        res.status(200).json({ message: "Post deleted", data: postData });
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
        next(err);
    }
};

export const getCommunityPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = config.SYSTEM_POSTS_PER_PAGE;
        const communityId = req.params.communityId;

        const { response: posts, count } = await getCommunityPostsService(
            communityId,
            page,
            limit,
            req.user!.uid
        );

        res.status(200).json({
            posts,
            hasMore: count > page * limit,
            count,
        });
    } catch (err) {
        next(err);
    }
};
