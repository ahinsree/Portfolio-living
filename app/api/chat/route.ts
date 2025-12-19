import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

// Use the key provided by the user
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "AIzaSyD-lgFlzuz0h4gh1e7_CX9oKfRjBumQfCI";

const google = createGoogleGenerativeAI({
    apiKey: API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Gemini requires the first message to be from the 'user'
        // and handles alternating roles. We'll sanitize the messages.
        const formattedMessages = messages
            .filter((m: any) => m.content && m.content.trim() !== '') // Remove empty messages
            .map((m: any) => ({
                role: (m.role === 'user' || m.role === 'assistant' || m.role === 'system') ? m.role : 'user',
                content: m.content,
            }));

        // Gemini specific: must start with user
        while (formattedMessages.length > 0 && formattedMessages[0].role !== 'user') {
            formattedMessages.shift();
        }

        if (formattedMessages.length === 0) {
            console.error('No valid user messages found after filtering');
            return new Response(JSON.stringify({ error: "No valid user messages provided. First message must be from user." }), { status: 400 });
        }

        console.log('--- Incoming messages ---', JSON.stringify(formattedMessages, null, 2));

        try {
            const result = streamText({
                model: google('gemini-1.5-flash-latest'),
                messages: formattedMessages,
                system: "You are a professional assistant for Portfolio Living.",
                onFinish: () => console.log('Stream finished successfully'),
            });

            return result.toDataStreamResponse();
        } catch (streamError: any) {
            console.error('STREAM INITIALIZATION ERROR:', streamError);
            // Fallback to gemini-pro if flash fails immediately
            const fallbackResult = streamText({
                model: google('gemini-pro'),
                messages: formattedMessages,
                system: "You are a professional assistant for Portfolio Living.",
            });
            return fallbackResult.toDataStreamResponse();
        }
    } catch (error: any) {
        console.error('TOP LEVEL SERVER ERROR:', error);
        return new Response(
            JSON.stringify({
                error: error.message || 'Internal Server Error',
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
