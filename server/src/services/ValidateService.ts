import { GeminiClient } from "@/ai/geminiClient";
import { validateFinalPostPrompt } from "@/ai/prompts/validateFinalPost";
import { safeExtractJSON } from "@/utils/safeExtractJSON";
import fs from "fs/promises";

const geminiClient = new GeminiClient();

type ValidationResponse = {
    valid: boolean;
    errors?: string[];
    suggestion?: string;
};

export async function validateCompletePost(
    body: any,
    images: Express.Multer.File[]
): Promise<ValidationResponse> {
    try {
        const { title, desc, hashtags } = body;

        if (!images || !images.length) throw new Error("Image required");

        const prompt = validateFinalPostPrompt(title, desc, hashtags);
        let response: ValidationResponse = { valid: true };

        for (const image of images) {
            const base64 = await fs.readFile(image.path, {
                encoding: "base64",
            });

            const raw = await geminiClient.generateTextwithImage(
                prompt,
                image.mimetype,
                base64
            );

            const json = JSON.parse(safeExtractJSON(raw as string));

            if (!json.valid) {
                response = json;
                break;
            }
        }

        return {
            valid: response.valid,
            errors: response.errors ?? [],
            suggestion: response.suggestion,
        };
    } catch (err) {
        throw err;
    }
}
