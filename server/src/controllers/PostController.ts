import config from "@/config";
import { editUser } from "@/firebase/editUser";
import { fetchUid } from "@/firebase/fetchUid";
import { CommentData } from "@/models/Comment";
import Post, { PostData } from "@/models/Post";
import Vote from "@/models/Vote";
import { deleteByParentId } from "@/services/CommentService";
import {
    createImageService,
    deleteImageService,
} from "@/services/ImageService";
import { formatError } from "@/utils/formatError";
import { generateId } from "@/utils/generateId";
import { UserData } from "@/utils/types/userDataType";
import { Request, Response } from "express";
import { Timestamp } from "firebase/firestore";

/**
 * GET - Controller responsável por capturar todos os post.
 * Tem suporte para filtros
 */
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        // Verifying if user is authenticated
        if (!req.user) throw new Error("No User provided");
        const { date, vote, tags, status } = req.query;

        // Verifying if page is provided
        const page = Number(req.query.page) === 0 ? 1 : Number(req.query.page),
            limit = config.SYSTEM_POSTS_PER_PAGE;

        // Verifying if has filters
        let sortFilter: Record<string, 1 | -1> = {};
        if (vote) sortFilter.upvotesCount = vote === "asc" ? 1 : -1; // vote filter
        if (date) sortFilter.createdAt = date === "asc" ? 1 : -1; // date filter

        let findFilter: Record<string, any> = {};
        if (tags) findFilter.tags = tags; // tags filter
        if (status) {
            findFilter.status = (status as string).toLowerCase();
            if (!req.user.isAdmin && status === "oculto")
                findFilter.status = "ativo";
        } // status filter

        // Fetching posts
        const postsData = await Post.find(findFilter)
            .sort(sortFilter)
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await Post.countDocuments(findFilter);

        // Verifying if user exists
        const userData = (await fetchUid(req.user.uid)) as UserData;
        if (!userData) throw new Error("User not found");

        // Adding isUpvoted to each post
        const postsResponse = await Promise.all(
            postsData.map(async (post) => {
                const isUpvoted = await Vote.findOne({
                    parentId: post._id,
                    userId: userData._publicId,
                    parentType: "Post",
                });

                return {
                    ...post.toObject(),
                    isUpvoted: !!isUpvoted,
                };
            })
        );

        // Sending response
        res.status(200).json({
            posts: postsResponse,
            hasMore: count > page * limit,
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
 * GET - Controller responsável por capturar um post de acordo com seu id.
 */
export const getPostById = async (req: Request, res: Response) => {
    try {
        // Verifying if user is authenticated
        if (!req.user) throw new Error("No User provided");

        // Verifying if post ID is provided
        if (!req.params.postId) throw new Error("No Post ID provided");
        const postId = req.params.postId;

        // Fetching post data and verifying if post exists
        const postData = await Post.findById(postId).populate({
            path: "comments",
            populate: { path: "replies" },
        });
        if (!postData) throw new Error("Post not found");

        // Verifying if user exists
        const userData = (await fetchUid(req.user.uid)) as UserData;
        if (!userData) throw new Error("User not found");

        // Verifying if user has upvoted
        const postUpvoted = await Vote.findOne({
            parentId: postData._id,
            userId: userData._publicId,
            parentType: "Post",
        });

        // Transoform post data in an object
        const post = postData.toObject() as PostData;

        // Verifying if user has upvoted comment
        await Promise.all(
            post.comments.map(async (comment) => {
                const commentUpvoted = await Vote.findOne({
                    // @ts-ignore
                    parentId: comment._id,
                    userId: userData._publicId,
                    parentType: "Comment",
                });
                // @ts-ignore
                comment.isUpvoted = !!commentUpvoted;

                // Verifying if user has upvoted replies
                // @ts-ignore
                if (comment.replies && comment.replies.length > 0) {
                    await Promise.all(
                        // @ts-ignore
                        comment.replies.map(async (reply: CommentData) => {
                            const replyUpvoted = await Vote.findOne({
                                // @ts-ignore
                                parentId: comment._id,
                                userId: userData._publicId,
                                parentType: "Comment",
                            });
                            // @ts-ignore
                            reply.isUpvoted = !!replyVote;
                        })
                    );
                }
            })
        );
        // Creating response
        const postResponse = {
            ...post,
            isUpvoted: !!postUpvoted,
        };

        res.status(200).json({ post: postResponse });
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
 * GET - Controller responsável por capturar todos os posts de um usuario de acordo com seu Id.
 */
export const getPostByUser = async (req: Request, res: Response) => {
    try {
        if (!req.params.userId) throw new Error("No User ID provided");
        const userId = req.params.userId;

        const postsData = await Post.find({ userId });

        res.status(200).json({ posts: postsData });
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
 * POST - Controller responsável por criar um novo post.
 * Valida as imagens, cria o post e retorna o resultado.
 */
export const createPost = async (
    req: Request,
    res: Response
): Promise<void> => {
    const uploadedImages: string[] = [];

    try {
        if (!req.user) throw new Error("No user provided");

        const { uid, isAdmin } = req.user;
        const { title, desc, tags, location, address, status } =
            req.body as PostData;

        // Verifying if images exists and making it an url
        if (!req.files) throw new Error("Image required");
        const files = req.files as Express.Multer.File[];
        for (const image of files) {
            uploadedImages.push(await createImageService(image.path));
        }

        // Verifying if user exists
        const userData = (await fetchUid(uid)) as UserData;

        const convertedReset = new Timestamp(
            // @ts-ignore
            userData.reportsResetAt._seconds,
            // @ts-ignore
            userData.reportsResetAt._nanoseconds
        );
        const resetDate = convertedReset.toMillis();

        // Verifying if user can do reports
        if (Date.now() > resetDate) {
            await editUser(uid, {
                remainingReports: config.SYSTEM_MAXIMUM_REPORTS,
                reportsResetAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
            });
            userData.remainingReports = config.SYSTEM_MAXIMUM_REPORTS;
        }

        if (!isAdmin && userData.remainingReports <= 0) {
            throw new Error("User has no remaining reports");
        }

        const _id = generateId(config.SYSTEM_ID_SIZE, "P_"),
            userPhoto = userData.image,
            userName = userData.fName,
            userId = userData._publicId,
            severity = "pequena",
            tagsFormatted = tags.map((tag: string) => tag.toLowerCase());

        // Cria o novo post no banco de dados
        const newPost = await Post.create({
            _id,
            userId,
            userName,
            userPhoto,
            title,
            desc,
            images: uploadedImages,
            tags: tagsFormatted,
            location,
            address,
            status,
            severity,
        });

        const userRemainingReports = isAdmin
            ? userData.remainingReports
            : userData.remainingReports - 1;

        const userTotalReports = (await Post.find({ userUid: uid })).length;

        let newUserData: Partial<UserData> = {
            remainingReports: userRemainingReports,
            totalReports: userTotalReports,
        };
        if (userData.remainingReports - 1 <= 0)
            newUserData = {
                ...newUserData,
                reportsResetAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
            };

        await editUser(uid, newUserData);

        res.status(201).json({ message: "New post created", data: newPost });
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
 * DEL - Controller responsável por deletar um post.
 */
export const deletePost = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // | Pegando o ID do POST --------------->
        if (!req.params.postId) throw new Error("Post ID not informed");
        const postId = req.params.postId;

        // | Pegando o POST --------------->
        const postData = await Post.findById(postId);
        if (!postData) throw new Error("Post does not exist");

        // | Deletando as imagens do POST --------------->
        postData.images.forEach(async (imageURL) => {
            await deleteImageService(imageURL as string);
        });
        // | Deletando os comments e os replies do POST --------------->
        await deleteByParentId(postId);

        // | Deletando o POST
        await postData.deleteOne();

        res.status(200).json({ message: "Post deleted", data: postData });
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
 * PUT - Controller responsável por deletar um post.
 */
export const updatePost = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Validando o ID do POST --------------->
        if (!req.params.postId) throw new Error("Post ID not informed");
        const postId = req.params.postId;

        // Confirindo se o Post existe --------------->
        const postData = await Post.findById(postId);
        if (!postData) throw new Error("Post does not exist");

        // Normalizando imagens recebidas --------------->
        let imagesArray: string[] = [];
        if (Array.isArray(req.body.images)) {
            imagesArray = req.body.images.filter(Boolean);
        } else if (
            typeof req.body.images === "string" &&
            req.body.images !== ""
        ) {
            imagesArray = [req.body.images];
        }

        // Verificando se as URLs passadas existem --------------->
        for (const imageURL in imagesArray) {
            console.log(imageURL);
            if (!postData.images.includes(imageURL) && imageURL !== "")
                throw new Error(`Some image URL does not exist in this Post`);
        }

        // Upload de novas imagens --------------->
        let uploadedImages: string[] = [];
        if (req.files) {
            // Verificando o limite --------------->
            const files = req.files as Express.Multer.File[];
            if (
                imagesArray.length + files.length > 3 ||
                imagesArray.length + files.length < 1
            ) {
                throw new Error(`Inconsistent amount of images`);
            }

            // Agora fazendo o Upload --------------->
            uploadedImages = await Promise.all(
                files.map((file) => createImageService(file.path))
            );

            // Deletando as imagens antigas (exceto as que foram passadas) --------------->
            await Promise.all(
                postData.images
                    .filter((url) => !imagesArray.includes(url))
                    .map((url) => {
                        deleteImageService(url);
                    })
            );
        }

        // Infos atualizadas --------------->
        const updatedFields = {
            ...req.body,
            images: [...imagesArray, ...uploadedImages],
        };

        // Atualizando --------------->
        const updatedPost = await postData.updateOne(updatedFields, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ message: "Post updated", data: updatedPost });
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
