import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("Listing models...");
        // The SDK doesn't have a direct listModels on genAI, usually it's a fetch or via a specific client.
        // But we can try to guess a few more common ones or use a raw fetch.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log("Models list response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error listing models:", e.message);
    }
}

listModels();
