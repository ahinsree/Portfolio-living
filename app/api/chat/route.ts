import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

// Use the key provided by the user
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!API_KEY) {
    console.warn("WARNING: GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables.");
}

const google = createGoogleGenerativeAI({
    apiKey: API_KEY || '',
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const formattedMessages = messages
            .filter((m: any) => m.content && m.content.trim() !== '')
            .map((m: any) => ({
                role: (m.role === 'user' || m.role === 'assistant' || m.role === 'system') ? m.role : 'user',
                content: m.content,
            }));

        while (formattedMessages.length > 0 && formattedMessages[0].role !== 'user') {
            formattedMessages.shift();
        }

        if (formattedMessages.length === 0) {
            return new Response(JSON.stringify({ error: "No valid user messages provided." }), { status: 400 });
        }

        const result = streamText({
            model: google('gemini-1.5-flash'),
            messages: formattedMessages,
            system: "You are a professional assistant for Portfolio Living.",
        });

        return result.toDataStreamResponse();
    } catch (error: any) {
        console.error('CHAT SERVER ERROR:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
