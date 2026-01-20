import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { content, targetLanguage, title } = await req.json();

        if (!content || !targetLanguage) {
            return NextResponse.json(
                { error: "Content and targetLanguage are required" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
      Translate the following blog post title and content into ${targetLanguage}. 
      Keep the HTML structure intact if present. 
      Only return the translated title and content in a JSON format like this:
      {
        "translatedTitle": "...",
        "translatedContent": "..."
      }
      
      Title: ${title}
      Content: ${content}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Attempt to parse JSON from the response
        try {
            const jsonStart = text.indexOf('{');
            const jsonEnd = text.lastIndexOf('}') + 1;
            const jsonStr = text.substring(jsonStart, jsonEnd);
            const translatedData = JSON.parse(jsonStr);
            return NextResponse.json(translatedData);
        } catch (parseError) {
            console.error("Error parsing Gemini response:", text);
            return NextResponse.json({
                translatedTitle: title, // Fallback to original
                translatedContent: text // Maybe it returned just the text?
            });
        }

    } catch (error: any) {
        console.error("Translation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to translate" },
            { status: 500 }
        );
    }
}
