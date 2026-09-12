import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey });

async function checkModels() {
  const modelsToTest = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-3.6-flash",
  ];

  for (const m of modelsToTest) {
    const start = performance.now();
    try {
      const res = await client.models.generateContent({
        model: m,
        contents: "Hello! Answer in 1 short sentence.",
      });
      console.log(`✓ Model ${m} SUCCEEDED in ${Math.round(performance.now() - start)}ms: "${res.text?.trim()}"`);
    } catch (err) {
      console.log(`✗ Model ${m} FAILED (${Math.round(performance.now() - start)}ms): ${err.message?.slice(0, 120)}`);
    }
  }
}

checkModels();
