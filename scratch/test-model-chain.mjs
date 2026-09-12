import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey });

const MYTH_SYSTEM_PROMPT = `
You are THE MYTH — an original, legendary superhero.
Tone: Calm, mysterious, highly intelligent, confident, deeply empathetic, observant, slightly intimidating, emotionally controlled, reassuring.
Voice: Speak in impactful, evocative, and complete sentences (2-3 sentences).
Core Identity: Your defining power is LISTENING and UNDERSTANDING. You uncover the problem beneath the problem.
`;

const MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

async function callGeminiChain(prompt) {
  for (const model of MODELS) {
    try {
      const res = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: MYTH_SYSTEM_PROMPT,
          maxOutputTokens: 800,
          temperature: 0.7,
        }
      });
      const reply = res.text?.trim();
      if (reply) {
        return { text: reply, model };
      }
    } catch (err) {
      console.log(`Model ${model} failed (${err.message?.slice(0, 60)}), trying next...`);
    }
  }
  throw new Error("All models failed");
}

async function testChain() {
  console.log("=== Testing Post-Submission Questions via Model Chain ===");
  const questions = [
    "what is ur origin story?",
    "what all u can do?",
    "what will happen to my request regarding the power grid?",
    "how do you know when someone is lying?",
  ];

  for (const q of questions) {
    const prompt = `
Visitor Name: "Rachel"
Visitor Input: "${q}"

CURRENT TASK: The visitor (Rachel) has already submitted their request. Respond to their question as THE MYTH with calm wisdom, gravitas, and deep empathy.
`;
    const res = await callGeminiChain(prompt);
    console.log(`\n[Question]: "${q}"`);
    console.log(`[The Myth via ${res.model}]:\n"${res.text}"`);
  }
}

testChain();
