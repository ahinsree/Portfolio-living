import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Use the key you provided
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "AIzaSyD-lgFlzuz0h4gh1e7_CX9oKfRjBumQfCI";
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
        }, { apiVersion: 'v1' });

        console.log('--- RAW SDK REQUEST ---');

        // Filter out any messages except user/assistant and fix the history structure
        // The first message in Gemini history MUST be from 'user'
        const rawHistory = messages.slice(1, -1); // Skip the first 'assistant' message we added in initialMessages
        const chatHistory = rawHistory.map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessageStream(lastMessage);

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        controller.enqueue(encoder.encode(text));
                    }
                } catch (e) {
                    console.error('Stream error:', e);
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked'
            },
        });

    } catch (error: any) {
        console.error('SERVER SIDE ERROR:', error.message);
        return new Response(error.message, { status: 500 });
    }
}
