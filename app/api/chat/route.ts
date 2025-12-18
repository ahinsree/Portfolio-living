import { GoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

// Use the key provided by the user
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "AIzaSyD-lgFlzuz0h4gh1e7_CX9oKfRjBumQfCI";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        console.log('--- Chat API Request ---');

        // We use the Vercel AI SDK again but with explicit provider and fallback logic
        const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
        const google = createGoogleGenerativeAI({
            apiKey: API_KEY,
        });

        // Try gemini-1.5-flash first, then fallback to gemini-pro
        let result;
        try {
            result = streamText({
                model: google('gemini-1.5-flash'),
                messages: messages.map((m: any) => ({
                    role: m.role,
                    content: m.content,
                })),
                system: "You are a professional assistant for Portfolio Living.",
            });
        } catch (e) {
            console.log('Gemini 1.5 Flash failed, falling back to Gemini Pro...');
            result = streamText({
                model: google('gemini-pro'),
                messages: messages.map((m: any) => ({
                    role: m.role,
                    content: m.content,
                })),
                system: "You are a professional assistant for Portfolio Living.",
            });
        }

        return result.toDataStreamResponse();
    } catch (error: any) {
        console.error('SERVER SIDE ERROR:', error.message);
        return new Response(
            JSON.stringify({ error: error.message || 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
