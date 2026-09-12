import { getFallbackMythResponse } from "../lib/gemini.ts";

function testQuestions() {
  const visitorData = {
    name: "rechel",
    age: 22,
    location: "Metro City",
    email: "rechel@domain.com",
    grievance: "The sector lights have been malfunctioning.",
  };

  const questions = [
    "what is ur origin story?",
    "what all u can do?",
    "who are you?",
    "what happens to my request now?",
    "I am scared about tomorrow",
    "thank you so much",
    "where are you located right now?",
    "tell me something else"
  ];

  console.log("=== TESTING FALLBACK DYNAMIC RESPONSES ===");
  for (const q of questions) {
    const res = getFallbackMythResponse("COMPLETED", q, visitorData);
    console.log(`\n[User]: "${q}"`);
    console.log(`[The Myth]: "${res}"`);
  }
}

testQuestions();
