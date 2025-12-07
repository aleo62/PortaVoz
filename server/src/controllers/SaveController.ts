import config from "@/config";
import {
    createSaveService,
    deleteSaveService,
    getSavesByUserService,
} from "@/services/SaveService";
import { NextFunction, Request, Response } from "express";

export const getSaves = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { userId } = req.params;

        const page = Number(req.query.page) || 1;
        const limit = config.SYSTEM_POSTS_PER_PAGE;

        const result = await getSavesByUserService(userId, page, limit, uid);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const createSave = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { postId } = req.params;

        await createSaveService(uid, postId);

        res.status(201).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const deleteSave = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { postId } = req.params;

        await deleteSaveService(uid, postId);

        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};
