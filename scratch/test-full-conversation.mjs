import { generateMythResponse } from "../lib/gemini.ts";

async function testFullConversation() {
  console.log("=== FULL CONVERSATION SEQUENCE TEST ===");

  const steps = [
    { step: "NAME", input: "Marcus", data: {} },
    { step: "AGE", input: "24", data: { name: "Marcus" } },
    { step: "LOCATION", input: "Sector 7", data: { name: "Marcus", age: 24 } },
    { step: "EMAIL", input: "marcus@domain.com", data: { name: "Marcus", age: 24, location: "Sector 7" } },
    { step: "GRIEVANCE", input: "The flood sirens in district 3 have gone offline.", data: { name: "Marcus", age: 24, location: "Sector 7", email: "marcus@domain.com" } },
    { step: "COMPLETED", input: "Thank you. What will you do next?", data: { name: "Marcus", age: 24, location: "Sector 7", email: "marcus@domain.com", grievance: "The flood sirens in district 3 have gone offline." } },
  ];

  const history = [];

  for (const s of steps) {
    console.log(`\n[Visitor (${s.step})]: "${s.input}"`);
    history.push({ role: "user", content: s.input });

    const res = await generateMythResponse({
      step: s.step,
      visitorInput: s.input,
      visitorData: s.data,
      history,
    });

    console.log(`[The Myth (${res.isFallback ? "FALLBACK" : "GEMINI"})]: "${res.text}"`);
    history.push({ role: "assistant", content: res.text });
  }

  console.log("\n=== ALL STEPS COMPLETED SUCCESSFULLY ===");
}

testFullConversation();
