import { createRepostService } from "@/services/RepostService";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

export const createRepost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { postId } = req.params;

        await createRepostService(uid, postId);

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
