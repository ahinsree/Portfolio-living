import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;

async function findFlash() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        const flashModels = data.models.filter(m => m.name.includes("flash") && m.supportedGenerationMethods.includes("generateContent"));
        console.log("Available Flash Models:");
        flashModels.forEach(m => console.log(m.name));
    } catch (e) {
        console.error("Error:", e.message);
    }
}

findFlash();
