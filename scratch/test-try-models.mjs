const apiKey = process.env.GEMINI_API_KEY;

const candidates = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.7-flash",
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
];

async function tryModels() {
  for (const m of candidates) {
    const start = performance.now();
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "Hello! Answer in 1 short sentence." }] }],
        })
      });
      const data = await res.json();
      const elapsed = Math.round(performance.now() - start);
      if (res.ok) {
        console.log(`✓ [SUCCESS] ${m} in ${elapsed}ms: "${data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()}"`);
      } else {
        console.log(`✗ [FAIL] ${m} in ${elapsed}ms: ${data.error?.message?.slice(0, 100)}`);
      }
    } catch (e) {
      console.log(`✗ [ERROR] ${m}:`, e.message);
    }
  }
}

tryModels();
