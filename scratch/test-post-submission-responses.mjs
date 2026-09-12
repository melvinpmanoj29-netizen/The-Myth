import { generateMythResponse, getFallbackMythResponse } from "../lib/gemini.ts";

async function testQuestions() {
  const visitorData = {
    name: "Rachel",
    age: 24,
    location: "Chicago",
    email: "rachel@domain.com",
    grievance: "My local community center has lost all city funding and might shut down.",
  };

  const history = [
    { role: "user", content: "Rachel" },
    { role: "assistant", content: "Good to meet you, Rachel. How many years have you walked this world?" },
    { role: "user", content: "24" },
    { role: "assistant", content: "24 years... Where on this earth are you transmitting from?" },
    { role: "user", content: "Chicago" },
    { role: "assistant", content: "Chicago. If I need to reach you after this, where should I send my response? Provide your email." },
    { role: "user", content: "rachel@domain.com" },
    { role: "assistant", content: "Frequency locked. There is one final matter, Rachel. So... tell me. How can I help?" },
    { role: "user", content: "My local community center has lost all city funding and might shut down." },
    { role: "assistant", content: "Your signal has reached me, Rachel. I'm still listening. What else do you want me to know?" }
  ];

  const questions = [
    "What will you actually do to help our community center?",
    "How does your resonance power work?",
    "When should I expect to hear back from you?",
    "I feel like giving up on this city.",
    "Do you work alone or with a team?",
    "Can I update my email address?",
    "Thank you for listening to me.",
  ];

  console.log("=== TESTING POST-SUBMISSION GEMINI & FALLBACK RESPONSES ===\n");
  for (const q of questions) {
    const res = await generateMythResponse({
      step: "COMPLETED",
      visitorInput: q,
      visitorData,
      history,
    });
    console.log(`[Visitor]: "${q}"`);
    console.log(`[The Myth (${res.isFallback ? "FALLBACK" : "GEMINI"})]: "${res.text}"\n`);
  }
}

testQuestions();
