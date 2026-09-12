const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    console.log("Status:", res.status);
    if (data.models) {
      console.log("Available models for generateContent:");
      data.models
        .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
        .forEach(m => console.log(`- ${m.name} (${m.displayName})`));
    } else {
      console.log("Error response:", data);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

listModels();
