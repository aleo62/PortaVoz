import config from "@/config";
import { ContentListUnion, GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

export class GeminiClient {
    public generateText = async (prompt: string) => {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                { role: "user", parts: [{ text: prompt }] }
            ],
        });

        return response.text;
    };
    public generateTextwithImage = async (prompt: string, mimeType: string, imagePath: string) => {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                { role: "user", parts: [{ text: prompt }] },
                { role: "user", parts: [{ inlineData: { mimeType, data: imagePath } }] },
            ],
        });

        return response.text;
    };
}
