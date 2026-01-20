import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testFix() {
    try {
        console.log("Testing gemini-flash-latest...");
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Hello, can you hear me? Just say YES.");
        console.log("Response:", result.response.text());
    } catch (e) {
        console.error("Error:", e.message);
    }
}

testFix();
