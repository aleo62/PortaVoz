import {
    createRepostService,
    deleteRepostService,
} from "@/services/RepostService";
import { NextFunction, Request, Response } from "express";

export const createRepost = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { postId } = req.params;

        await createRepostService(uid, postId);

        res.status(201).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const deleteRepost = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { postId } = req.params;

        await deleteRepostService(uid, postId);

        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};
