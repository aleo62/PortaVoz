import { fetchPublicId } from "@/firebase/fetchPublidId";
import Notification, { NotificationData } from "@/models/Notification";
import { updateCounter } from "./UserService";

export const sendNotificationToUser = async ({
    userId,
    senderId,
    senderPhoto,
    title,
    content,
    href,
    type,
    preview,
}: Partial<NotificationData>) => {
    try {
        // Verifying if user exists
        const { userData } = await fetchPublicId(userId as string);
        if (!userData) throw new Error("User does not exists.");
        if(userId === senderId) return;

        const existing = await Notification.find({ userId, senderId, type });
        if (existing.length > 0 && type !== "Comment") return;

        await Notification.create({
            userId,
            senderId,
            senderPhoto,
            title,
            content,
            href,
            type,
            preview,
        });

        // Edit counter
        await updateCounter(userId as string, {
            unreadNotifications:
                userData?.meta?.counters.unreadNotifications + 1,
        });
    } catch (err) {
        throw err;
    }
};
