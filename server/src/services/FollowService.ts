import Follow from "@/models/Follow.model";
import User from "@/models/User.model";
import { sendNotificationToUser } from "./NotificationService";

const modifiyQuantityFollowing = async (
    followingId: string,
    followerId: string,
    inc: number
) => {
    await User.updateOne(
        { _id: followerId },
        { $inc: { "meta.counters.following": inc } }
    );

    await User.updateOne(
        { _id: followingId },
        { $inc: { "meta.counters.followers": inc } }
    );
};

export const getFollowingService = async (
    followingId: string,
    followerId: string
) => {
    const isFollowing = await Follow.exists({
        userId: followingId,
        follower: followerId,
    });

    return { isFollowing };
};

export const followService = async (
    followingId: string,
    followerId: string
) => {
    const followExists = await Follow.exists({
        userId: followingId,
        follower: followerId,
    });
    if (followExists || followerId === followingId)
        throw new Error("Already following.");

    await Follow.create({
        userId: followingId,
        follower: followerId,
    });
    await modifiyQuantityFollowing(followingId, followerId, 1);

    await sendNotificationToUser({
        userId: followingId,
        sender: followerId,
        href: `/profile/${followerId}`,
        type: "Follow",
        preview: undefined,
    });
};

export const unfollowService = async (
    followingId: string,
    followerId: string
) => {
    const followExists = await Follow.exists({
        userId: followingId,
        follower: followerId,
    });
    if (followExists || followerId === followingId)
        throw new Error("Already following.");

    await Follow.create({
        userId: followingId,
        follower: followerId,
    });
    await modifiyQuantityFollowing(followingId, followerId, 1);

    await sendNotificationToUser({
        userId: followingId,
        sender: followerId,
        href: `/profile/${followerId}`,
        type: "Follow",
        preview: undefined,
    });
};
