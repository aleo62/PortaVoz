export const safeExtractJSON = (raw: string): string => {
    try {
        const match = raw.match(/\{[\s\S]*\}/); 
        if (match) {
            return match[0];
        }
        throw new Error("No valid JSON found.");
    } catch (err) {
        throw new Error("Failure to extract JSON: " + err);
    }
}