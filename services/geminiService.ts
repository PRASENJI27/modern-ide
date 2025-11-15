
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateCode(userPrompt: string, currentCode: string): Promise<string> {
  const model = "gemini-2.5-pro";

  const fullPrompt = `You are an expert AI developer assistant. Your goal is to help users write, understand, and debug code.

Instructions:
1. Analyze the user's request and the provided code context.
2. If the user asks to generate code, provide a clean, well-commented code block.
3. If the user asks to fix an error, identify the error, explain it briefly, and provide the corrected code.
4. If the user asks for an explanation, describe the code's functionality clearly and concisely.
5. Format your entire response in Markdown. Code blocks should be in their own fenced block (e.g., \`\`\`javascript ... \`\`\`). Do not add any text before or after the markdown response.

---

User Request:
"${userPrompt}"

---

Current Code in Editor:
\`\`\`
${currentCode}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error: Failed to get response from AI. ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI."
  }
}
