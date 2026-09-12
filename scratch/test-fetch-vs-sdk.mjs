const apiKey = process.env.GEMINI_API_KEY;

async function testFetch() {
  const start = performance.now();
  console.log("[Direct Fetch] Request started");
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: "Hello The Myth, my name is Alex." }]
          }
        ],
        systemInstruction: {
          parts: [{ text: "You are The Myth. Reply in 1 sentence." }]
        },
        generationConfig: {
          maxOutputTokens: 60,
          temperature: 0.7
        }
      })
    });
    const data = await res.json();
    const elapsed = Math.round(performance.now() - start);
    console.log(`[Direct Fetch] Response in ${elapsed}ms:`, data?.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (err) {
    console.error("[Direct Fetch] Error:", err.message);
  }
}

testFetch();
