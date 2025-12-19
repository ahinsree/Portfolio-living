
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = "AIzaSyD-lgFlzuz0h4gh1e7_CX9oKfRjBumQfCI";
const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("hello");
        const response = await result.response;
        console.log('Gemini 1.5 Flash output:', response.text());
    } catch (err) {
        console.error('Gemini 1.5 Flash error:', err.message);
    }
}

test();
