
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const analyzeFileContent = async (fileContent: string, userQuery: string): Promise<string> => {
    const model = 'gemini-2.5-flash';
    
    const fullPrompt = `You are an expert file analyst. Below is the content of a file and a user's question about it. Provide a concise and accurate answer based strictly on the provided file content.

--- FILE CONTENT ---
${fileContent}
--- END FILE CONTENT ---

USER QUESTION: "${userQuery}"

Your Analysis:`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: fullPrompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
};
