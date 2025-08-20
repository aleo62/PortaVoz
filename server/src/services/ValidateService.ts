import { GeminiClient } from "@/ai/geminiClient";
import { validateContentPrompt } from "@/ai/prompts/validateContent";
import { validateHashtagsPrompt } from "@/ai/prompts/validateHashtags";
import { validateImagePrompt } from "@/ai/prompts/validateImages";
import { safeExtractJSON } from "@/utils/safeExtractJSON";
import fs from "fs/promises";

const geminiClient = new GeminiClient();

/**
 * Valida o content (tile, desc) do post
 * @param body da requisição
 */
export async function validatePostContent(body: any) {
    try {
        const { title, desc } = body;

        return await geminiClient.generateText(
            validateContentPrompt(title, desc)
        );
    } catch (err) {
        throw err;
    }
}

/**
 * Valida as hashtags (tile, desc, hashtags) do post
 * @param body da requisição
 */
export async function validatePostHashtags(body: any) {
    try {
        const { title, desc, hashtags } = body;

        return await geminiClient.generateText(
            validateHashtagsPrompt(title, desc, hashtags)
        );
    } catch (err) {
        throw err;
    }
}

/**
 * Valida as imagens (tile, desc, iamges) do post
 * @param body da requisição
 */
export async function validatePostImages(
    body: any,
    images: Express.Multer.File[]
) {
    try {
        let analyse = JSON.stringify({ valid: true });
        const { title, desc } = body;

        if (!images) throw new Error("Image required");
        const files = images as Express.Multer.File[];

        for (const image of files) {
            const base64 = await fs.readFile(image.path, { encoding: "base64" });

            const raw = await geminiClient.generateTextwithImage(
                validateImagePrompt(title, desc),
                image.mimetype,
                base64
            );
            const json = JSON.parse(safeExtractJSON(raw as string));
            if (!json.valid) {
                analyse = raw!;
      
                break;
            }
        }

        return analyse;
    } catch (err) {
        throw err;
    }
}
