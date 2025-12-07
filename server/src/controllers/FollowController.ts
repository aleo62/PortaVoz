import Follow from "@/models/Follow.model";
import User, { UserData } from "@/models/User.model";
import { followService, getFollowingService } from "@/services/FollowService";
import { fetchUser } from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

export const getFollowing = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { followingId } = req.params;
        const { uid: followerId } = req.user!;

        const { isFollowing } = await getFollowingService(
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
        if (!req.params) throw new Error("No UnfollowId provided.");

        if (!req.user) throw new Error("No User provided.");
        const { uid } = req.user;
        const userData = (await fetchUser(uid)) as UserData;

        const unfollowData = await fetchUser(req.params.unfollowId);
        if (!unfollowData) throw new Error("Unfollow User does not exists.");

        const unfollow = await Follow.findOneAndDelete({
            userId: unfollowData._id,
            follower: userData._id,
        });
        if (!unfollow) throw new Error("Not following this User.");

        await User.updateOne(
            { _id: req.user.uid },
            { $inc: { "meta.counters.following": -1 } }
        );
        await User.updateOne(
            { _id: unfollowData._id },
            { $inc: { "meta.counters.followers": -1 } }
        );

        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};
