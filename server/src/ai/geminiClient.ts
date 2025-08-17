import config from "@/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

export const GeminiClient = async (prompt: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt 
    })

    return response.text
}

