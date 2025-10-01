import Notification, { NotificationData } from "@/models/Notification.model";
import User from "@/models/User.model";
import { fetchUser } from "@/services/UserService";

export const sendNotificationToUser = async ({
    userId,
    senderId,
    senderImage,
    title,
    content,
    href,
    type,
    preview,
}: Partial<NotificationData>) => {
    try {
        // Verifying if user exists
        const userData = await fetchUser(userId as string);
        if (!userData) throw new Error("User does not exists.");
        if (userId === senderId) return;

        const existing = await Notification.find({ userId, senderId, type });
        if (existing.length > 0 && type !== "Comment") return;

        await Notification.create({
            userId,
            senderId,
            senderImage,
            title,
            content,
            href,
            type,
            preview,
        });

        // Updating user
        await User.updateOne(
            { _id: userId },
            { $inc: { "meta.counters.unreadNotifications": 1 } }
        );
    } catch (err) {
        throw err;
    }
};
