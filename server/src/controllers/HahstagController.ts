import Hashtag from "@/models/Hashtag.model";
import { NextFunction, Request, Response } from "express";

export const getHahstags = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const hashtags = await Hashtag.find({
            content: { $regex: req.query.hashtag, $options: "i" },
        });

        res.status(200).json({
            hashtags,
        });
    } catch (err) {
        next(err);
    }
};
