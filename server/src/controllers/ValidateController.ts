import {
    validatePostContent,
    validatePostHashtags,
    validatePostImages,
} from "@/services/ValidateService";
import { safeExtractJSON } from "@/utils/safeExtractJSON";
import { Request, Response } from "express";


export const validateStages = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const stage = req.params.stage as "content" | "images" | "hashtags";

        const validateMap = {
            content: () => validatePostContent(req.body),
            hashtags: () => validatePostHashtags(req.body),
            images: () =>
                validatePostImages(
                    req.body,
                    req.files as Express.Multer.File[]
                ),
        } as const;

       

        const raw = await validateMap[stage]();

        const json = JSON.parse(safeExtractJSON(raw as string));
        const response = {
            valid: json.valid,
            errors: json.errors,
            suggestions: json.suggestions,
        };

        res.status(200).json({ ...response });
    } catch (err) {
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err,
        });
    }
};
