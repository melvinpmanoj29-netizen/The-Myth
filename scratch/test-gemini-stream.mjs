import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key present:", !!apiKey);

if (!apiKey) {
  console.log("No GEMINI_API_KEY found.");
  process.exit(0);
}

const client = new GoogleGenAI({ apiKey });

async function testStream() {
  const start = performance.now();
  console.log("[Gemini] Request started");
  try {
    const stream = await client.models.generateContentStream({
      model: "gemini-3.6-flash",
      contents: "Hello, my name is Bruce. I need your guidance.",
      config: {
        systemInstruction: "You are The Myth. Respond with calm strength in 2 sentences.",
        temperature: 0.7,
      }
    });

    let firstChunkTime = 0;
    let fullText = "";
    for await (const chunk of stream) {
      if (!firstChunkTime) {
        firstChunkTime = performance.now() - start;
        console.log(`[Gemini] First chunk received in: ${Math.round(firstChunkTime)}ms`);
      }
      if (chunk.text) {
        process.stdout.write(chunk.text);
        fullText += chunk.text;
      }
    }
    const totalTime = performance.now() - start;
    console.log(`\n[Gemini] Response time: ${Math.round(totalTime)}ms`);
  } catch (err) {
    console.error("Stream error:", err);
  }
}

testStream();
