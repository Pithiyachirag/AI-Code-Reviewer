import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

// console.log(process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


const app = express();

app.use(cors());
app.use(express.json());


const PORT = 5000;

app.get("/", (req, res) => {
    res.json({
        sucess: true,
        message: "Backend is running.....",
    });
});

app.post("/review", async (req, res) => {
    try {
        console.log("Review API Hit");

        const { code, language } = req.body;

        const prompt = `
You are an expert senior software engineer and code reviewer.

Analyze the following ${language} code.

Code:
${code}

Rules:
- Do not invent fake bugs or errors.
- If there are no syntax errors, write: "No syntax errors found."
- If there are no logical bugs, write: "No logical bugs found."
- Do not suggest unnecessary improvements.
- If the code is already optimized, write: "The code is already well optimized. No code changes are required."
- Give a realistic Code Quality Score out of 100.
- Always answer in Markdown.
- Whenever you provide code, wrap it in a markdown code block with the correct language.
- If the submitted code is already clean and production-ready, give a score between 95 and 100.
- Do not reduce the score for optional or stylistic suggestions.

Use this exact format:

# ⭐ Code Quality Score

# ❌ Errors

# 🐞 Bugs

# 💡 Improvements

# ✅ Best Practices

# 🚀 Optimized Code
`;

        const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash",
            input: prompt,
        });

        console.log(interaction.output_text);

        res.json({
            success: true,
            review: interaction.output_text,
        });

    } catch (error) {
        console.error("Gemini Error:", error);

        res.status(error.status || 500).json({
            success: false,
            message: error.message,
        });
    }
});

app.post("/explain", async (req, res) => {
    try {

        const { code, language } = req.body;

        const prompt = `
You are an expert programming teacher.

Explain the following ${language} code in simple language.

Code:
${code}

Rules:
- Explain line by line.
- Explain variables.
- Explain functions.
- Explain logic.
- Use simple English.
- Use Markdown.
- Use headings and bullet points.
`;

        const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash",
            input: prompt,
        });

        res.json({
            success: true,
            explanation: interaction.output_text,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
});

app.post("/chat", async (req, res) => {
    try {

        const { review, question } = req.body;

        const prompt = `
You are an expert Senior Software Engineer.

The following is an AI code review.

${review}

The user asks:

"${question}"

Answer only the user's question.

Keep the answer:
- Clear
- Professional
- Beginner friendly
- Markdown formatted
- Short unless more detail is requested.
`;

        const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash",
            input: prompt,
        });

        res.json({
            success: true,
            answer: interaction.output_text,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
