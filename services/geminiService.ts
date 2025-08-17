import { GoogleGenAI, Chat } from "@google/genai";
import { type PortfolioData } from '../types';

let chat: Chat | null = null;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const initializeChat = (portfolioData: PortfolioData) => {
    const systemInstruction = `You are a helpful and friendly AI assistant for the portfolio of Dharmendiran E. Your personality is professional yet approachable. Answer questions based *only* on the following portfolio data. Do not make up information. If a question is outside this scope or you don't know the answer from the data, politely state that you can only answer questions about Dharmendiran's portfolio. Format your answers clearly, using markdown for lists or emphasis where appropriate.

Here is the portfolio data in JSON format:
${JSON.stringify(portfolioData, null, 2)}`;

    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
    });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
    if (!chat) {
        throw new Error("Chat not initialized. Call initializeChat first.");
    }
    try {
        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Sorry, I encountered an error. Please try again later.";
    }
};
