import Follow from "@/models/Follow.model";
import User, { UserData } from "@/models/User.model";
import { sendNotificationToUser } from "@/services/NotificationService";
import { fetchUser } from "@/services/UserService";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

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
        const userData = (await fetchUser(uid)) as UserData;

        // Verifying if following user exists
        const followingData = await fetchUser(req.params.followingId);
        if (!followingData) throw new Error("Following User does not exists.");

        const following = await Follow.findOne({
            userId: followingData._id,
            follower: userData._id,
        })
            .populate("follower", "username image")
            .exec();

        res.status(200).json({
            following,
            isFollowing: !!following,
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
        const userData = (await fetchUser(uid)) as UserData;

        // Verifying if following user exists
        const followingData = await fetchUser(req.params.followingId);
        if (!followingData) throw new Error("Following User does not exists.");

        const existing = await Follow.find({
            userId: followingData._id,
            followingId: userData._id,
        });

        if (existing.length > 0 || followingData._id === userData._id)
            throw new Error("Already following.");

        const newFollow = await Follow.create({
            userId: followingData._id,
            follower: userData._id,
        });

        // Updating who is following
        await User.updateOne(
            { _id: req.user.uid },
            { $inc: { "meta.counters.following": 1 } }
        );

        // Updating who is being followed
        await User.updateOne(
            { _id: req.params.followingId },
            { $inc: { "meta.counters.followers": 1 } }
        );

        // Sending notification
        await sendNotificationToUser({
            userId: req.params.followingId,
            senderId: uid,
            senderImage: userData.image,
            title: `${userData.username} começou a te seguir!`,
            content: `Você conseguiu um novo seguidor, ${userData.username} começou a te seguir!`,
            href: `/profile/${userData._id}`,
            type: "Follow",
            preview: undefined,
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
        const userData = (await fetchUser(uid)) as UserData;

        // Verifying if following user exists
        const unfollowData = await fetchUser(req.params.unfollowId);
        if (!unfollowData) throw new Error("Unfollow User does not exists.");

        const unfollow = await Follow.findOneAndDelete({
            userId: unfollowData._id,
            follower: userData._id,
        });
        if (!unfollow) throw new Error("Not following this User.");
        // Updating who is following
        await User.updateOne(
            { _id: req.user.uid },
            { $inc: { "meta.counters.following": -1 } }
        );

        // Updating who is being followed
        await User.updateOne(
            { _id: unfollowData._id },
            { $inc: { "meta.counters.followers": -1 } }
        );

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
