import config from "@/config";
import { fetchUid } from "@/firebase/fetchUid";
import Notification from "@/models/Notification";
import { updateCounter } from "@/services/UserService";
import { formatError } from "@/utils/formatError";
import { UserData } from "@/utils/types/userDataType";
import { Request, Response } from "express";
/**
 * GET - Controller responsável por pegar as notificações
 */

export const getNotifications = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifying if user is authenticated
        if (!req?.user) throw new Error("User not provided.");
        const { uid } = req?.user;
        const userId = ((await fetchUid(uid)) as UserData)._publicId;

        // Verifying if page is provided
        const page = Number(req.query.page) === 0 ? 1 : Number(req.query.page),
            limit = config.SYSTEM_COMMENTS_PER_PAGE;

        // Fetching notifications
        const notificationsData = await Notification.find({ userId })
            .skip((page - 1) * limit)
            .limit(limit);
        const count = await Notification.countDocuments({ userId });

        // Updating the counts
        await updateCounter(userId, { unreadNotifications: 0 });

        // Sending response
        res.status(200).json({
            notifications: notificationsData,
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
