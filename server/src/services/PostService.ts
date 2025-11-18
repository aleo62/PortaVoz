import config from "@/config";
import Hashtag from "@/models/Hashtag.model";
import Post, { PostData } from "@/models/Post.model";
import User from "@/models/User.model";
import Vote from "@/models/Vote.model";
import { generateId } from "@/utils/generateId";
import { Request } from "express";
import { findOrCreateMultipleHashtags } from "./HashtagService";
import { uploadMultipleImages } from "./ImageService";
import { fetchUser, verifyRemainingReports } from "./UserService";

const resolveFilterQuery = async (req: Request) => {
    const { date, vote, status, search, hashtags } = req.query;

    const sortFilter: Record<string, 1 | -1> = {};
    const findFilter: Record<string, any> = {};

    if (vote) sortFilter.upvotesCount = vote === "asc" ? 1 : -1;
    if (date) sortFilter.createdAt = date === "asc" ? 1 : -1;
    if (hashtags) {
        const hashtagsId = await Promise.all(
            (hashtags as string).split(",").map(async (content: string) => {
                const hashtagId = (await Hashtag.findOne({ content }))?._id;
                return hashtagId;
            })
        );
        findFilter.hashtags = { $in: hashtagsId };
    }
    if (status) {
        findFilter.status =
            !req.user!.isAdmin && status === "oculto"
                ? "ativo"
                : (status as string).toLowerCase();
    }
    if (search) findFilter.title = { $regex: search as string, $options: "i" };

    return { findFilter, sortFilter };
};

const resolvePostResponse = async (
    postData: PostData | PostData[],
    user: { uid: string; isAdmin: boolean; email: string; isVerified: boolean }
) => {
    let postResponse;

    if (Array.isArray(postData)) {
        postResponse = await Promise.all(
            postData.map(async (post) => {
                const isUpvoted = await Vote.findOne({
                    parentId: post._id,
                    user: user?.uid,
                    parentType: "Post",
                });
                return { ...post.toObject(), isUpvoted: !!isUpvoted };
            })
        );
    }
    return { postResponse };
};

export const getPosts = async (req: Request, page: number, limit: number) => {
    const { findFilter, sortFilter } = await resolveFilterQuery(req);

    const postData: PostData[] = await Post.find(findFilter)
        .populate("user", "username image")
        .populate("hashtags", "content")
        .sort(sortFilter)
        .skip((page - 1) * limit)
        .limit(limit);

    const count = await Post.countDocuments(findFilter);

    const { postResponse: postsResponse } = await resolvePostResponse(
        postData,
        req.user!
    );

    return { postsResponse, count };
};

export const getSinglePost = async (req: Request) => {
    const postId = req.params.postId;
    const postData = await Post.findById(postId)
        .populate("user", "username image")
        .populate("hashtags", "content");
    if (!postData) throw new Error("Post not found");

    const userData = await fetchUser(req.user!.uid);
    const postUpvoted = await Vote.findOne({
        parentId: postData._id,
        user: userData._id,
        parentType: "Post",
    });

    const post = postData.toObject() as PostData;
    const postResponse = { ...post, isUpvoted: !!postUpvoted };

    return { postResponse };
};

export const createPost = async (req: Request) => {
    if (!req.user) throw new Error("No user provided");

    const { uid, isAdmin } = req.user;
    const { title, desc, hashtags, location, address, status } =
        req.body as PostData;

    const images = await uploadMultipleImages(
        req.files as Express.Multer.File[],
        "posts_images"
    );

    const { canReport } = await verifyRemainingReports(uid, isAdmin);
    if (!canReport) throw new Error("User has no remaining reports");

    const hashtagsId = await findOrCreateMultipleHashtags(hashtags);

    const newPost = await Post.create({
        _id: generateId(config.SYSTEM_ID_SIZE, "P_"),
        user: uid,
        title,
        desc,
        images,
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

    return { newPost };
};
