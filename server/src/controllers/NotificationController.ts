import config from "@/config";
import { getNotificationsService } from "@/services/NotificationService";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

export const getNotifications = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const page = Number(req.query.page) || 1,
            limit = config.SYSTEM_COMMENTS_PER_PAGE;

        const { notifications, count } = await getNotificationsService(
            req.params.userId,
            page,
            limit
        );

        res.status(200).json({
            notifications,
            hasMore: count > page * limit,
            count,
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
