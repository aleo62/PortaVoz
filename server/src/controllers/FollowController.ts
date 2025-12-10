import Follow from "@/models/Follow.model";
import User from "@/models/User.model";
import {
    followService,
    getIsFollowingService,
    unfollowService,
} from "@/services/FollowService";
import { NextFunction, Request, Response } from "express";

export const getIsFollowing = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { followingId } = req.params;
        const { uid: followerId } = req.user!;

        const { isFollowing } = await getIsFollowingService(
            followingId,
            followerId
        );

        res.status(200).json({
            isFollowing,
        });
    } catch (err) {
        next(err);
    }
};

export const followUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { followingId } = req.params;
        const { uid: followerId } = req.user!;
        await followService(followingId, followerId);

        await res.status(201).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const unfollowUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { unfollowId } = req.params;
        const { uid: followerId } = req.user!;

        await unfollowService(unfollowId, followerId);

        await res.status(201).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const getFollowers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.params;
        const { name } = req.query;

        const page = Number(req.query.page) || 1;
        const limit = 20;

        const filter = { following: userId };

        const count = await Follow.countDocuments(filter);

        const follows = await Follow.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: "follower",
                select: "username fName lName image",
                match: name
                    ? { username: { $regex: name, $options: "i" } }
                    : {},
            });

        const users = follows
            .map((f: any) => f.follower)
            .filter((u: any) => u !== null);

        res.status(200).json({
            users,
            hasMore: count > page * limit,
            count,
            page,
            limit,
        });
    } catch (err) {
        next(err);
    }
};

export const getFollowing = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.params;
        const { name } = req.query;

        const page = Number(req.query.page) || 1;
        const limit = 20;

        const filter = { follower: userId };

        const count = await Follow.countDocuments(filter);

        const follows = await Follow.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: "following",
                select: "username fName lName image meta.counters.postsCount",
                match: name
                    ? { username: { $regex: name, $options: "i" } }
                    : {},
            });

        const users = follows
            .map((f: any) => f.following)
            .filter((u:any) => u !== null);

        res.status(200).json({
            users,
            hasMore: count > page * limit,
            count,
            page,
            limit,
        });
    } catch (err) {
        next(err);
    }
};