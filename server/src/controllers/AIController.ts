import { validatePostContent } from "@/services/AIService";
import { Request, response, Response } from "express";

/**
 * POST - Controller responsável por validar conteúdo
 */
export const validateStages = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const stage = req.params.stage as "content" | "images" | "hashtags";

        const validateMap = {
            content: () => validatePostContent(req.body),
            images: () => validatePostContent(req.body),
            hashtags: () => validatePostContent(req.body),
        } as const;

        const raw = await validateMap[stage]();

        const json = JSON.parse(raw || "");
        const response = {
            valid: json.valid,
            errors: json.errors,
            suggestions: json.suggestions,
        };

        // console.log(response);
        // res.status(201).json(response);
        res.status(201).json({ message: raw });
    } catch (err) {
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err,
        });
    }
};
