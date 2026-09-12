import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key present:", !!apiKey);

const client = new GoogleGenAI({ apiKey });

async function test() {
  const start = performance.now();
  console.log("[Gemini] Request started");
  try {
    const response = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Hello, who are you? Answer in 1 short sentence.",
    });
    console.log("[Gemini] gemini-3.6-flash Response:", response.text);
    console.log(`[Gemini] Response time: ${Math.round(performance.now() - start)}ms`);
  } catch (err) {
    console.error("2.5-flash Error:", err.message);
  }

  const start2 = performance.now();
  console.log("[Gemini] Testing gemini-2.0-flash / gemini-1.5-flash...");
  try {
    const response = await client.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Hello",
    });
    console.log("[Gemini] 1.5-flash Response:", response.text);
    console.log(`[Gemini] 1.5 Response time: ${Math.round(performance.now() - start2)}ms`);
  } catch (err) {
    console.error("1.5-flash Error:", err.message);
  }
}

test();
