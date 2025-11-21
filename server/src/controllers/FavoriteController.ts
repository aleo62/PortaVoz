import {
    createFavoriteService,
    deleteFavoriteService,
} from "@/services/FavoriteService";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

export const createFavorite = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { postId } = req.params;

        await createFavoriteService(uid, postId);

        res.status(201).json({ ok: true });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};

export const deleteFavorite = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { postId } = req.params;

        await deleteFavoriteService(uid, postId);

        res.status(200).json({ ok: true });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};
