import { listHashtags } from "@/services/HashtagService";
import { NextFunction, Request, Response } from "express";

export const getHashtags = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const search =
            (req.query.q as string) || (req.query.hashtag as string) || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const { hashtags, total } = await listHashtags({ search, page, limit });

        res.status(200).json({
            hashtags,
            total,
            page,
            limit,
        });
    } catch (err) {
        next(err);
    }
};
