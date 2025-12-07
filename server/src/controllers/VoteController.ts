import {
    createUpvoteService,
    deleteUpvoteService,
} from "@/services/VoteService";
import { NextFunction, Request, Response } from "express";

export const createUpvote = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { parentId } = req.params;

        await createUpvoteService(uid, parentId);

        res.status(201).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const deleteUpvote = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { parentId } = req.params;

        await deleteUpvoteService(uid, parentId);

        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};
