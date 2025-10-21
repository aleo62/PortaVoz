import config from "@/config";
import Hashtag from "@/models/Hashtag.model";
import Post, { PostData } from "@/models/Post.model";
import User from "@/models/User.model";
import Vote from "@/models/Vote.model";
import { deleteByParentId } from "@/services/CommentService";
import { findOrCreateHashtag } from "@/services/HashtagService";
import {
    createImageService,
    deleteImageService,
} from "@/services/ImageService";
import { fetchUser, verifyRemainingReports } from "@/services/UserService";
import { formatError } from "@/utils/formatError";
import { generateId } from "@/utils/generateId";
import { Request, Response } from "express";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        if (!req.user) throw new Error("No user provided");

        const { date, vote, tags, status, search } = req.query;
        const page = Number(req.query.page) || 1;
        const limit = config.SYSTEM_POSTS_PER_PAGE;

        const sortFilter: Record<string, 1 | -1> = {};
        if (vote) sortFilter.upvotesCount = vote === "asc" ? 1 : -1;
        if (date) sortFilter.createdAt = date === "asc" ? 1 : -1;

        const findFilter: Record<string, any> = {};
        if (tags) findFilter.tags = tags;
        if (status) {
            findFilter.status =
                !req.user.isAdmin && status === "oculto"
                    ? "ativo"
                    : (status as string).toLowerCase();
        }
        if (search)
            findFilter.title = { $regex: search as string, $options: "i" };

        const postsData = await Post.find(findFilter)
            .populate("user", "username image")
            .populate("hashtags", "content")
            .sort(sortFilter)
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await Post.countDocuments(findFilter);

        const postsResponse = await Promise.all(
            postsData.map(async (post) => {
                const isUpvoted = await Vote.findOne({
                    parentId: post._id,
                    user: req.user?.uid,
                    parentType: "Post",
                });
                return { ...post.toObject(), isUpvoted: !!isUpvoted };
            })
        );

        res.status(200).json({
            posts: postsResponse,
            hasMore: count > page * limit,
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
        const postId = req.params.postId;
        const postData = await Post.findById(postId).populate(
            "user",
            "username image"
        );
        if (!postData) throw new Error("Post not found");

        const userData = await fetchUser(req.user!.uid);
        const postUpvoted = await Vote.findOne({
            parentId: postData._id,
            userId: userData._id,
            parentType: "Post",
        });

        const post = postData.toObject() as PostData;
        res.status(200).json({ post: { ...post, isUpvoted: !!postUpvoted } });
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
        const posts = await Post.find({ user: userId }).populate(
            "user",
            "username image"
        );
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

export const createPost = async (req: Request, res: Response) => {
    const uploadedImages: string[] = [];

    try {
        if (!req.user) throw new Error("No user provided");

        const { uid, isAdmin } = req.user;
        const { title, desc, hashtags, location, address, status } =
            req.body as PostData;

        if (!req.files || !Array.isArray(req.files))
            throw new Error("Image required");

        for (const image of req.files as Express.Multer.File[]) {
            const imageUrl = await createImageService(
                image.path,
                "posts_images"
            );
            uploadedImages.push(imageUrl);
        }

        const { canReport } = await verifyRemainingReports(uid, isAdmin);
        if (!canReport) throw new Error("User has no remaining reports");

        const _id = generateId(config.SYSTEM_ID_SIZE, "P_");
        let hashtagsId: string[] = [];
        await Promise.all(
            hashtags.map(async (hashtag) => {
                hashtagsId.push((await findOrCreateHashtag(hashtag)) as string);
            })
        );

        const newPost = await Post.create({
            _id,
            user: uid,
            title,
            desc,
            images: uploadedImages,
            hashtags: hashtagsId,
            location,
            address,
            status,
        });

        if (!isAdmin) {
            const newDate = new Date();
            newDate.setDate(newDate.getDate() + 7);

            await User.updateOne(
                { _id: uid },
                {
                    $inc: {
                        "meta.limits.remainingReports": -1,
                        "meta.counters.totalReports": 1,
                    },
                    $set: { "meta.limits.reportsResetAt": newDate },
                }
            );
        }
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

        await Promise.all(
            postData.images.map((url) => deleteImageService(url))
        );
        await Promise.all(
            postData.hashtags.map(
                async (hashtag) =>
                    await Hashtag.findByIdAndUpdate(hashtag, {
                        usageCount: { $inc: -1 },
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
                files.map((file) => createImageService(file.path))
            );
            uploadedImages.push(...uploaded);

            await Promise.all(
                postData.images
                    .filter((url) => !imagesArray.includes(url))
                    .map((url) => deleteImageService(url))
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
