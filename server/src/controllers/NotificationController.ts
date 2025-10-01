import config from "@/config";
import Notification from "@/models/Notification.model";
import { formatError } from "@/utils/formatError";
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
        const userId = req.params.userId;

        // Verifying if page is provided
        const page = Number(req.query.page) === 0 ? 1 : Number(req.query.page),
            limit = config.SYSTEM_COMMENTS_PER_PAGE;

        // Fetching notifications
        const notificationsData = await Notification.find({ userId })
            .skip((page - 1) * limit)
            .limit(limit);
        const count = await Notification.countDocuments({ userId });

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
