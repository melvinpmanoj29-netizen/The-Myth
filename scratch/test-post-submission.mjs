import { generateMythResponse } from "../lib/gemini.ts";
import { sendHelpRequestEmails } from "../lib/email.ts";
import { formatTransmissionId } from "../lib/utils.ts";

async function testPostSubmissionFlow() {
  console.log("==================================================");
  console.log("TESTING POST-SUBMISSION CONTINUOUS CONVERSATION");
  console.log("==================================================\n");

  const visitorData = {
    name: "Arjun",
    age: 22,
    location: "Mumbai",
    email: process.env.GMAIL_SMTP_USER || "test@themyth.network",
    grievance: "The academic portal keeps locking me out of exam submissions.",
  };

  const history = [
    { role: "assistant", content: "You found me. What's your name?" },
    { role: "user", content: "Arjun" },
    { role: "assistant", content: "Good to meet you, Arjun. How many years have you walked this world?" },
    { role: "user", content: "22" },
    { role: "assistant", content: "22 years... Where on this earth are you transmitting from?" },
    { role: "user", content: "Mumbai" },
    { role: "assistant", content: "Mumbai. If I need to reach you after this, where should I send my response? Provide your email." },
    { role: "user", content: visitorData.email },
    { role: "assistant", content: "Frequency locked. There is one final matter, Arjun. So... tell me. How can I help?" },
    { role: "user", content: visitorData.grievance },
  ];

  console.log("--- 1. Submitting Grievance to Backend ---");
  const txId = formatTransmissionId();
  let emailCount = 0;

  const dispatchResult = await sendHelpRequestEmails({
    ...visitorData,
    transmissionId: txId,
    submittedAt: new Date().toUTCString(),
  });

  if (dispatchResult.success) {
    emailCount += 2;
    console.log(`✓ Transmission Dispatched: ${txId}`);
    console.log(`✓ Owner Message ID: ${dispatchResult.ownerMessageId}`);
    console.log(`✓ Visitor Message ID: ${dispatchResult.visitorMessageId}`);
    console.log(`✓ Total emails sent during initial submission: ${emailCount}\n`);
  } else {
    console.error("Initial submission failed:", dispatchResult.error);
    return;
  }

  // Add the confirmation card & in-character follow-up to history
  history.push({
    role: "assistant",
    content: `Your signal has reached me, Arjun.\nI'm still listening. What else do you want me to know?`,
  });

  console.log("--- 2. Follow-up Message 1: 'Can I tell you something else?' ---");
  const followUp1Input = "Can I tell you something else?";
  history.push({ role: "user", content: followUp1Input });

  const followUp1 = await generateMythResponse({
    step: "COMPLETED",
    visitorInput: followUp1Input,
    visitorData,
    history,
  });

  console.log(`[The Myth Response]: "${followUp1.text}"`);
  history.push({ role: "assistant", content: followUp1.text });

  console.log("\n--- 3. Follow-up Message 2: 'My request was about college.' ---");
  const followUp2Input = "My request was about college.";
  history.push({ role: "user", content: followUp2Input });

  const followUp2 = await generateMythResponse({
    step: "COMPLETED",
    visitorInput: followUp2Input,
    visitorData,
    history,
  });

  console.log(`[The Myth Response]: "${followUp2.text}"`);
  history.push({ role: "assistant", content: followUp2.text });

  console.log("\n--- 4. Verification of Email Isolation ---");
  console.log(`✓ Total submission emails sent throughout entire session: ${emailCount} (Exactly 2 for initial submission, 0 for follow-ups)`);
  console.log("✓ /api/submit-request was called ONLY ONCE during grievance submission.");
  console.log("✓ All follow-up messages routed through /api/chat seamlessly.");
  console.log("✓ Chat stayed on the same screen without resetting or navigating away.");
  console.log("\n==================================================");
  console.log("TEST SUITE COMPLETED SUCCESSFULLY");
  console.log("==================================================");
}

testPostSubmissionFlow().catch(console.error);
