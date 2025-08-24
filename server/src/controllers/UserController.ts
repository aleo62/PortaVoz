import { fetchPublicId } from "@/firebase/fetchPublidId";
import { fetchUid } from "@/firebase/fetchUid";
import Comment from "@/models/Comment";
import Follow from "@/models/Follow";
import Post from "@/models/Post";
import { createCounter, updateCounter } from "@/services/UserService";
import { formatError } from "@/utils/formatError";
import { UserData } from "@/utils/types/userDataType";
import { Request, Response } from "express";

/**
 * POST - Controller responsável por criar counter.
 */
export const createUserCounter = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.params) throw new Error("No UserId provided.");
        const userCounterData = await createCounter(req.params.userId);

        res.status(201).json({ data: userCounterData });
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
 * PUT - Controller responsável por atulizar todos os posts e comments.
 */
export const updateUserContent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");
        const { uid } = req.user;

        const userData = (await fetchUid(uid)) as UserData;
        const userId = userData._publicId;

        const userNewInfo: any = {};
        userNewInfo.userName = userData.fName;
        userNewInfo.userPhoto = userData.image;

        if (
            !(await Post.updateMany({ userId }, { $set: userNewInfo })) ||
            !(await Comment.updateMany({ userId }, { $set: userNewInfo }))
        )
            throw new Error("Error to update");

        res.status(200).json({
            message: `All Posts and Comments updated from: ${userId}`,
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
 * GET - Controller responsável por ver se o User esta seguindo outro.
 */
export const getFollowing = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifying if Following Id exists
        if (!req.params) throw new Error("No FollowingId provided.");

        // Verifying if user exists.
        if (!req.user) throw new Error("No User provided.");
        const { uid } = req.user;
        const userData = (await fetchUid(uid)) as UserData;

        // Verifying if following user exists
        const { userData: followingData } = await fetchPublicId(
            req.params.followingId
        );
        if (!followingData) throw new Error("Following User does not exists.");

        const following = await Follow.find({
            userId: userData._publicId,
            followingId: followingData._publicId,
        });

        res.status(200).json({ userId: userData._publicId, followingId: followingData._publicId, following: following.length > 0 });
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
 * POST - Controller responsável por seguir.
 */
export const followUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifying if Following Id exists
        if (!req.params) throw new Error("No FollowingId provided.");

        // Verifying if user exists.
        if (!req.user) throw new Error("No User provided.");
        const { uid } = req.user;
        const userData = (await fetchUid(uid)) as UserData;

        // Verifying if following user exists
        const { userData: followingData } = await fetchPublicId(
            req.params.followingId
        );
        if (!followingData) throw new Error("Following User does not exists.");

        const existing = await Follow.find({
            userId: userData._publicId,
            followingId: followingData._publicId,
        });

        if (
            existing.length > 0 ||
            followingData._publicId === userData._publicId
        )
            throw new Error("Already following.");

        const newFollow = await Follow.create({
            userId: userData._publicId,
            followingId: followingData._publicId,
            followingName: `${followingData.fName} ${followingData.lName}`,
            followingPhoto: followingData.image,
        });

        // Updating who is following
        await updateCounter(userData._publicId, {
            following: userData.meta.counters.following + 1,
        });

        // Updating who is being followed
        await updateCounter(followingData._publicId, {
            followers: followingData.meta.counters.followers + 1,
        });

        res.status(201).json({ data: newFollow });
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
 * DELETE - Controller responsável por desseguir.
 */
export const unfollowUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifying if Following Id exists
        if (!req.params) throw new Error("No UnfollowId provided.");

        // Verifying if user exists.
        if (!req.user) throw new Error("No User provided.");
        const { uid } = req.user;
        const userData = (await fetchUid(uid)) as UserData;

        // Verifying if following user exists
        const { userData: unfollowData } = await fetchPublicId(
            req.params.unfollowId
        );
        if (!unfollowData) throw new Error("Unfollow User does not exists.");

        const existing = await Follow.find({
            userId: userData._publicId,
            followingId: unfollowData._publicId,
        });

        if (
            existing.length === 0
        )
            throw new Error("Not following this User.");

        const unfollow = await Follow.findOneAndDelete({
            userId: userData._publicId,
            followingId: unfollowData._publicId,
        });

        // Updating who is following
        await updateCounter(userData._publicId, {
            following: userData.meta.counters.following - 1,
        });

        // Updating who is being followed
        await updateCounter(unfollowData._publicId, {
            followers: unfollowData.meta.counters.followers - 1,
        });

        res.status(200).json({ data: unfollow });
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
