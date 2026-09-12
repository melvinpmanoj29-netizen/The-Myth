import nodemailer from "nodemailer";

const host = process.env.GMAIL_SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.GMAIL_SMTP_PORT) || 587;
const user = process.env.GMAIL_SMTP_USER;
const pass = process.env.GMAIL_SMTP_PASSWORD;
const fromEmail = process.env.GMAIL_FROM_EMAIL || user;
const ownerEmail = process.env.MYTH_EMAIL_TO || user;

console.log("Config check:", { host, port, userSet: !!user, passSet: !!pass, fromEmail, ownerEmail });

if (!user || !pass) {
  console.log("Credentials missing.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: { user, pass },
  pool: true, // Use SMTP connection pooling for fast concurrent deliveries
  maxConnections: 5,
  maxMessages: 100,
});

async function testEmailConcurrent() {
  console.log("[Gmail SMTP] Submission started");
  const overallStart = performance.now();

  const sendOwner = async () => {
    const start = performance.now();
    try {
      const info = await transporter.sendMail({
        from: `"THE MYTH" <${fromEmail}>`,
        to: ownerEmail,
        subject: "PERF TEST — Owner Notification",
        text: "Performance benchmark owner notification test.",
      });
      const elapsed = Math.round(performance.now() - start);
      console.log(`[Gmail SMTP] Owner email: ${elapsed}ms`);
      return { success: true, messageId: info.messageId, elapsed };
    } catch (err) {
      const elapsed = Math.round(performance.now() - start);
      console.error(`[Gmail SMTP] Owner email failed in ${elapsed}ms:`, err.message);
      return { success: false, error: err.message, elapsed };
    }
  };

  const sendVisitor = async () => {
    const start = performance.now();
    try {
      const info = await transporter.sendMail({
        from: `"THE MYTH" <${fromEmail}>`,
        to: user, // send confirmation to user for testing
        subject: "PERF TEST — Visitor Confirmation",
        text: "Performance benchmark visitor confirmation test.",
      });
      const elapsed = Math.round(performance.now() - start);
      console.log(`[Gmail SMTP] Visitor email: ${elapsed}ms`);
      return { success: true, messageId: info.messageId, elapsed };
    } catch (err) {
      const elapsed = Math.round(performance.now() - start);
      console.error(`[Gmail SMTP] Visitor email failed in ${elapsed}ms:`, err.message);
      return { success: false, error: err.message, elapsed };
    }
  };

  const [ownerRes, visitorRes] = await Promise.all([sendOwner(), sendVisitor()]);
  const total = Math.round(performance.now() - overallStart);
  console.log(`[Gmail SMTP] Total: ${total}ms`);
  console.log("Results:", { ownerRes, visitorRes, total });
  transporter.close();
}

testEmailConcurrent();
