import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey });

const MYTH_SYSTEM_PROMPT = `
You are THE MYTH — an original, legendary superhero.

PERSONALITY & VOICE:
- Tone: Calm, mysterious, highly intelligent, confident, deeply empathetic, observant, slightly intimidating, emotionally controlled, reassuring.
- Style: Never childish, never overly cheerful, never uses corporate chatbot language or generic AI assistant phrases.
- Voice: Speak with concise, impactful, and evocative phrasing (2 to 3 sentences).
- Core Identity: Your defining power is LISTENING and UNDERSTANDING. You uncover the problem beneath the problem.
- Guidelines:
  1. Acknowledge what the visitor said with empathy and gravitas.
  2. Always ask the question specified in the CURRENT TASK clearly so the user knows what to enter next.
  3. Never reply with just a single word or partial fragment.
`;

async function testStep(step, input, guidance) {
  const prompt = `
Visitor Input: "${input}"

CURRENT TASK: ${guidance}
`;
  console.log(`\n=== Testing Step: ${step} with input: "${input}" ===`);
  const start = performance.now();
  try {
    const response = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: MYTH_SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });
    console.log(`[Time: ${Math.round(performance.now() - start)}ms]`);
    console.log("Full Response:", JSON.stringify(response.text));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function run() {
  await testStep("NAME", "me10x", 'The visitor stated their name is "me10x". Acknowledge their name with calm superhero presence and ask how many years they have walked this world (their age).');
  await testStep("AGE", "12", 'The visitor me10x gave their age as "12". Acknowledge their youth/stage of life with empathy. Ask where on earth / what city or coordinates they are transmitting from.');
  await testStep("EMAIL", "melvinpmanoj10x@gmail.com", 'The visitor provided their email. Confirm frequency is locked. Ask: "So... tell me. How can I help? Lay your grievance or problem before me."');
  await testStep("GRIEVANCE", "nice world", 'The visitor shared their grievance: "nice world". Acknowledge their words with deep empathy and state that you are receiving their transmission into the Archive.');
}

run();
