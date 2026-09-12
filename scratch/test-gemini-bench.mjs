import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey });

async function bench() {
  for (let i = 1; i <= 3; i++) {
    const start = performance.now();
    console.log(`[Gemini] Request #${i} started`);
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Visitor said: "I am John". Respond briefly in 1 sentence.`,
        config: {
          systemInstruction: "You are The Myth. Respond with calm superhero strength.",
          maxOutputTokens: 60,
          temperature: 0.7,
        }
      });
      const elapsed = Math.round(performance.now() - start);
      console.log(`[Gemini] Response #${i} (${elapsed}ms):`, response.text?.trim());
    } catch (err) {
      console.error(`[Gemini] Request #${i} failed:`, err.message);
    }
  }
}

bench();
