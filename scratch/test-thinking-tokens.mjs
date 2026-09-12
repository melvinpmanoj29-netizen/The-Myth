import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey });

const MYTH_SYSTEM_PROMPT = `
You are THE MYTH — an original, legendary superhero.

PERSONALITY & VOICE:
- Tone: Calm, mysterious, highly intelligent, confident, deeply empathetic, observant, slightly intimidating, emotionally controlled, reassuring.
- Style: Never childish, never overly cheerful, never uses corporate chatbot language or generic AI assistant phrases.
- Voice: Speak with concise, impactful, and evocative phrasing (2-3 sentences).
- Core Identity: Your defining power is LISTENING and UNDERSTANDING. You uncover the problem beneath the problem.
- Persona Guidelines:
  1. Always address the visitor respectfully. Use their name naturally if known.
  2. Acknowledge what they said with psychological insight.
  3. Seamlessly guide the visitor to the next step by asking the required question clearly.
  4. Never reply with just one word or truncate mid-sentence.
`;

async function testPrompt(name, stepDesc, input) {
  const prompt = `
Visitor Name: "${name}"
Visitor Input: "${input}"

INSTRUCTION: ${stepDesc}
`;
  console.log(`\n--- Test: ${input} ---`);
  const start = performance.now();
  try {
    const res = await client.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: MYTH_SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 800,
        thinkingConfig: {
          thinkingBudget: 0,
        }
      }
    });
    console.log(`[Time: ${Math.round(performance.now() - start)}ms]`);
    console.log("Response:", res.text?.trim());
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function run() {
  await testPrompt("me10x", "The visitor stated their name is 'me10x'. Acknowledge their name with calm intensity. Ask how many years they have walked this world (their age in earth years).", "me10x");
  await testPrompt("me10x", "The visitor stated their age is '12'. Acknowledge their stage of life briefly with empathy. Ask where in the world / what city or coordinates they are transmitting from.", "12");
  await testPrompt("me10x", "The visitor provided their email 'melvinpmanoj10x@gmail.com'. Confirm frequency is locked. Ask them directly: 'So... tell me. How can I help? Lay your grievance or problem before me.'", "melvinpmanoj10x@gmail.com");
  await testPrompt("me10x", "The visitor shared their core burden / grievance: 'The city power grid is failing'. Acknowledge the weight of their problem with high empathy and solemn strength. Tell them you are receiving their transmission into the Archive.", "The city power grid is failing");
}

run();
