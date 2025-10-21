import Hashtag from "@/models/Hashtag.model";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";
/**
 * GET - Controller responsável por pesquisar hashtags
 */


export const getHahstags = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("parametro:", req.query.hashtag);
        const hashtags = await Hashtag.find({ content: { $regex: req.query.hashtag, $options: "i" } });

        res.status(200).json({
            hashtags
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