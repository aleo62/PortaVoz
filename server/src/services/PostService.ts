import config from "@/config";
import Favorite from "@/models/Favorite.model";
import Hashtag from "@/models/Hashtag.model";
import Post, { PostData } from "@/models/Post.model";
import Repost from "@/models/Repost.model";
import User, { UserData } from "@/models/User.model";
import Vote from "@/models/Vote.model";
import { generateId } from "@/utils/generateId";
import { Request } from "express";
import { findOrCreateMultipleHashtags } from "./HashtagService";
import { uploadMultipleImages } from "./ImageService";
import { fetchUser, verifyRemainingReports } from "./UserService";
import { validateCompletePost } from "./ValidateService";

export const decreaseRemainingReports = async (uid: string, isAdmin: boolean) => {
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
};

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
    postData: PostData | PostData[] | any,
    userId: string
) => {
    const normalizePost = (post: any) =>
        typeof post?.toObject === "function" ? post.toObject() : post;

    const appendVoteState = async (post: any) => {
        const normalized = normalizePost(post);

        const isUpvoted = await Vote.exists({
            parentId: normalized._id,
            user: userId,
            parentType: "Post",
        });

        const isReposted = await Repost.exists({
            post: normalized._id,
            userId,
        });

        const isFavorited = await Favorite.exists({
            post: normalized._id,
            userId,
        });

        if (!normalized.user) {
            normalized.user = {
                _id: "",
                username: "[usuário removido]",
                image: "https://res.cloudinary.com/di5bma0gm/image/upload/v1758557907/default_image_wroapp.jpg",
            };
        }
        return {
            ...normalized,
            isUpvoted: !!isUpvoted,
            isReposted: !!isReposted,
            isFavorited: !!isFavorited,
        };
    };

    if (Array.isArray(postData)) {
        const postResponse = await Promise.all(
            postData.map((post) => appendVoteState(post))
        );
        return { postResponse };
    }

    if (postData) {
        const postResponse = await appendVoteState(postData);
        return { postResponse };
    }

    return { postResponse: postData };
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

    const { postResponse: response } = await resolvePostResponse(
        postData,
        req.user!.uid
    );

    return { response, count };
};

export const getSinglePost = async (req: Request) => {
    const postId = req.params.postId;
    const postData = await Post.findById(postId)
        .populate("user", "username image")
        .populate("hashtags", "content");
    if (!postData) throw new Error("Post not found");

    const { postResponse: response } = await resolvePostResponse(
        postData,
        req.user!.uid
    );

    return { response };
};

export type PostListType = "all" | "posts" | "reposts";
const buildEnrichmentStages = () => [
    {
        $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            pipeline: [{ $project: { _id: 1, username: 1, image: 1 } }],
            as: "user",
        },
    },
    {
        $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
        },
    },
    {
        $lookup: {
            from: "hashtags",
            localField: "hashtags",
            foreignField: "_id",
            pipeline: [{ $project: { _id: 1, content: 1 } }],
            as: "hashtags",
        },
    },
    {
        $project: {
            _id: 1,
            user: {
                _id: "$user._id",
                username: "$user.username",
                image: "$user.image",
            },
            title: 1,
            desc: 1,
            images: 1,
            hashtags: {
                $map: {
                    input: "$hashtags",
                    as: "hashtag",
                    in: {
                        _id: "$$hashtag._id",
                        content: "$$hashtag.content",
                    },
                },
            },
            location: 1,
            address: 1,
            upvotesCount: 1,
            commentsCount: 1,
            repostsCount: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
            kind: 1,
            activityDate: 1,
            repostId: 1,
            repostedAt: 1,
            repostedBy: 1,
        },
    },
];

const buildPostsPipeline = (userId: string) => [
    { $match: { user: userId } },
    {
        $addFields: {
            kind: "post",
            activityDate: "$createdAt",
        },
    },
    ...buildEnrichmentStages(),
];

const buildRepostsPipeline = (userId: string, userData: UserData) => [
    { $match: { userId } },
    {
        $lookup: {
            from: "posts",
            localField: "post",
            foreignField: "_id",
            as: "post",
        },
    },
    { $unwind: "$post" },
    {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    "$post",
                    {
                        kind: "repost",
                        activityDate: "$createdAt",
                        repostId: "$_id",
                        repostedAt: "$createdAt",
                        repostedBy: {
                            _id: userData._id,
                            username: userData.username,
                            image: userData.image,
                        },
                    },
                ],
            },
        },
    },
    ...buildEnrichmentStages(),
];

export const getPostsByUserService = async (
    userId: string,
    type: PostListType = "all",
    uid: string
) => {
    const userData = await fetchUser(userId);
    const sortStage = { $sort: { activityDate: -1 } };
    let aggregatedPosts: any[] = [];

    switch (type) {
        case "posts":
            aggregatedPosts = await Post.aggregate([
                ...buildPostsPipeline(userId),
                sortStage,
            ] as any);
            break;
        case "reposts":
            aggregatedPosts = await Repost.aggregate([
                ...buildRepostsPipeline(userId, userData),
                sortStage,
            ] as any);
            break;
        default:
            const pipeline: any[] = [...buildPostsPipeline(userId)];
            pipeline.push({
                $unionWith: {
                    coll: "reposts",
                    pipeline: buildRepostsPipeline(userId, userData),
                },
            });
            pipeline.push(sortStage);

            aggregatedPosts = await Post.aggregate(pipeline as any);
            break;
    }

    const { postResponse: response } = await resolvePostResponse(
        aggregatedPosts,
        uid
    );

    return { response };
};

export const createPost = async (req: Request) => {
    const { uid, isAdmin } = req.user!;
    const { title, desc, hashtags, location, address, status } =
        req.body as PostData;
    const files = req.files as Express.Multer.File[];
    if (!files || !files.length) throw new Error("Images are required");

    const { canReport } = await verifyRemainingReports(uid, isAdmin);
    if (!canReport) throw new Error("User has no remaining reports");

    const finalValidation = await validateCompletePost(req.body, files);
    if (!finalValidation.valid) {
        const errorMessage =
            finalValidation.errors && finalValidation.errors.length
                ? finalValidation.errors.join(" | ")
                : "Invalid post";
        throw new Error(errorMessage);
    }

    const images = await uploadMultipleImages(files, "posts_images");

    const hashtagsId = await findOrCreateMultipleHashtags(
        typeof hashtags === "string" ? [hashtags] : hashtags
    );

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

    return { newPost };
};
