import { GeminiClient } from "@/ai/geminiClient";
import { validateContentPrompt } from "@/ai/prompts/validateContent";
import { validateHashtagsPrompt } from "@/ai/prompts/validateHashtags";

/**
 * Valida o content (tile, desc) do post
 * @param body da requisição
 */
export async function validatePostContent(body: any) {
    try {
        const { title, desc } = body;

        return await GeminiClient(validateContentPrompt(title, desc));
    } catch (err) {
        throw err;
    }
}

/**
 * Valida o content (tile, desc) do post
 * @param body da requisição
 */
export async function validatePostHashtags(body: any) {
    try {
        const { title, desc, hashtags } = body;

        return await GeminiClient(
            validateHashtagsPrompt(title, desc, hashtags)
        );
    } catch (err) {
        throw err;
    }
}
