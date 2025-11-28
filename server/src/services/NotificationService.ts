import Notification, { NotificationData } from "@/models/Notification.model";
import User from "@/models/User.model";
import { fetchUser } from "@/services/UserService";

export const sendNotificationToUser = async ({
    userId,
    sender,
    href,
    type,
    preview,
}: Partial<NotificationData>) => {
    try {
        const userData = await fetchUser(userId as string);
        if (!userData) throw new Error("User does not exists.");
        if (userId === sender) return;

        const { notifications } = userData.meta.preferences || {
            notifications: {
                receiveVote: true,
                receiveFollow: true,
                receiveComment: true,
            },
        };

        if (type === "Vote" && !notifications.receiveVote) return;
        if (type === "Follow" && !notifications.receiveFollow) return;
        if (type === "Comment" && !notifications.receiveComment) return;

        const existing = await Notification.find({ userId, sender, type });
        if (existing.length > 0 && type !== "Comment") return;

        await Notification.create({
            userId,
            sender,
            href,
            type,
            preview,
        });

        await User.updateOne(
            { _id: userId },
            { $inc: { "meta.counters.unreadNotifications": 1 } }
        );
    } catch (err) {
        throw err;
    }
};

export const getNotificationsService = async (
    userId: string,
    page: number,
    limit: number
) => {
    const skip = Number(limit * (page - 1));

    const notifications = await Notification.aggregate([
        { $match: { userId } },

        { $sort: { createdAt: -1 } },

        { $limit: limit },

        { $skip: skip },

        {
            $lookup: {
                from: "users",
                let: { senderId: "$sender" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$senderId"] } } },
                    { $project: { username: 1, image: 1, _id: 0 } },
                ],
                as: "sender",
            },
        },

        {
            $unwind: { path: "$sender" },
        },

        {
            $addFields: {
                message: {
                    $switch: {
                        branches: [
                            {
                                case: { $eq: ["$type", "Vote"] },
                                then: {
                                    $concat: [
                                        "$sender.username",
                                        " te deu Upvote!",
                                    ],
                                },
                            },
                            {
                                case: { $eq: ["$type", "Follow"] },
                                then: {
                                    $concat: [
                                        "$sender.username",
                                        " começou a te seguir!",
                                    ],
                                },
                            },
                            {
                                case: { $eq: ["$type", "Comment"] },
                                then: {
                                    $concat: [
                                        "$sender.username",
                                        " comentou em você!",
                                    ],
                                },
                            },
                        ],
                    },
                },
            },
        },
    ]);
    const count = await Notification.countDocuments({ userId });

    return { notifications, count };
};
