
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
const { generateText } = require('ai');

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;

const google = createGoogleGenerativeAI({
    apiKey: API_KEY,
});

async function test() {
    const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
    for (const modelName of models) {
        try {
            console.log(`Testing with ${modelName}...`);
            const result = await generateText({
                model: google(modelName),
                messages: [{ role: 'user', content: 'hello' }],
            });
            console.log(`Result with ${modelName}:`, result.text);
            return;
        } catch (err) {
            console.error(`Error with ${modelName}:`, err.message);
        }
    }
}

test();
