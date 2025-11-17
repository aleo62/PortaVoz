import {
    createUpvoteService,
    deleteUpvoteService,
} from "@/services/VoteService";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

export const createUpvote = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { parentId } = req.params;

        await createUpvoteService(uid, parentId);

        res.status(201).json({ ok: true });
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

export const deleteUpvote = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { parentId } = req.params;

        await deleteUpvoteService(uid, parentId);

        res.status(200).json({ ok: true });
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
