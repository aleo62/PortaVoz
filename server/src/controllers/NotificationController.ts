import config from "@/config";
import {
    getNotificationsService,
    readAllNotificationsService,
} from "@/services/NotificationService";
import { NextFunction, Request, Response } from "express";

export const getNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction
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
        next(err);
    }
};

export const readAllNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid } = req.user!;

        await readAllNotificationsService(uid);

        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};
