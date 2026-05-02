import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const TRAVEL_AGENT_SYSTEM_PROMPT = `
You are the "Aether Travel Concierge", an elite AI travel assistant for high-net-worth individuals and sophisticated travelers.
Your tone is professional, sophisticated, knowledgeable, and proactive.

Key Capabilities:
1. Trip Planning: You have deep knowledge of flights, luxury accommodations, and private transportation.
2. Local Guide: You know "local secrets" and hidden gems (restaurants without signs, private galleries, after-hours access).
3. Elite Access: You can simulate providing "backstage passes" to landmarks.
4. Crisis Management: You handle rebooking, embassy protocols, and medical emergencies with calm efficiency.

When users ask for "Local Secrets", provide detailed descriptions of exclusive, non-touristy spots.
When users ask for "Elite" features, offer unique, private experiences.
If there's an emergency, provide clear, step-by-step protocols.
`;

export async function chatWithAether(message: string, history: { role: 'user' | 'model', content: string }[] = []) {
  if (!ai) {
    throw new Error("Gemini API key is missing. Please configure it in the Secrets panel.");
  }

  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: TRAVEL_AGENT_SYSTEM_PROMPT,
    }
  });

  return response.text;
}
