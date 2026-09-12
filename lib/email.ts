import nodemailer from "nodemailer";
import {
  createOwnerEmail,
  createVisitorConfirmationEmail,
  EmailParams,
} from "./email-templates";
import { HelpRequestPayload } from "@/types/visitor";

export interface SendHelpRequestParams extends HelpRequestPayload {
  transmissionId: string;
  submittedAt: string;
}

export interface EmailDispatchResult {
  success: boolean;
  ownerSuccess: boolean;
  visitorSuccess: boolean;
  ownerMessageId?: string;
  visitorMessageId?: string;
  error?: string;
}

/**
 * Diagnostic logger that checks environment variable presence without leaking secret credentials.
 */
export function logGmailDiagnostics() {
  const host = process.env.GMAIL_SMTP_HOST;
  const port = process.env.GMAIL_SMTP_PORT;
  const user = process.env.GMAIL_SMTP_USER;
  const pass = process.env.GMAIL_SMTP_PASSWORD;
  const fromEmail = process.env.GMAIL_FROM_EMAIL;
  const ownerEmail = process.env.MYTH_EMAIL_TO;

  console.log("[Gmail SMTP Diagnostics]:", {
    GMAIL_SMTP_HOST: host || "DEFAULT (smtp.gmail.com)",
    GMAIL_SMTP_PORT: port || "DEFAULT (587)",
    GMAIL_SMTP_USER: user ? "PRESENT" : "MISSING",
    GMAIL_SMTP_PASSWORD: pass && pass !== "your_gmail_app_password_here" ? "PRESENT" : "MISSING",
    GMAIL_FROM_EMAIL: fromEmail ? "PRESENT" : user ? "USING_USER" : "DEFAULT (notifications@themyth.network)",
    MYTH_EMAIL_TO: ownerEmail ? "PRESENT" : user ? "USING_USER" : "DEFAULT (emergency@themyth.network)",
  });
}

let cachedTransporter: nodemailer.Transporter | null = null;

/**
 * Initializes and caches the Nodemailer Gmail SMTP transporter with connection pooling.
 */
export function getGmailTransporter(): nodemailer.Transporter | null {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const user = process.env.GMAIL_SMTP_USER;
  const pass = process.env.GMAIL_SMTP_PASSWORD;

  if (!user || !pass || pass === "your_gmail_app_password_here" || pass.trim() === "") {
    return null;
  }

  const host = process.env.GMAIL_SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.GMAIL_SMTP_PORT) || 587;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // Use STARTTLS / TLS upgrade on port 587
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
    pool: true, // Reuse open SMTP connections for instant subsequent dispatches
    maxConnections: 5,
    maxMessages: 100,
  });

  return cachedTransporter;
}

/**
 * Dispatches both Owner Notification and Visitor Confirmation emails concurrently via Gmail SMTP.
 * Handles complete success, complete failure, and partial failure states safely with exact timing logs.
 */
export async function sendHelpRequestEmails(
  params: SendHelpRequestParams
): Promise<EmailDispatchResult> {
  const overallStart = performance.now();
  console.log("[Gmail SMTP] Submission started");

  const transporter = getGmailTransporter();

  if (!transporter) {
    console.error("[Gmail SMTP] Configuration missing: GMAIL_SMTP_USER or GMAIL_SMTP_PASSWORD is not set.");
    throw new Error("Gmail SMTP credentials are not configured. Email transmission cannot proceed.");
  }

  const fromAddress = process.env.GMAIL_FROM_EMAIL || process.env.GMAIL_SMTP_USER || "notifications@themyth.network";
  const fromName = process.env.GMAIL_FROM_NAME || "THE MYTH";
  const ownerEmail = process.env.MYTH_EMAIL_TO || process.env.GMAIL_SMTP_USER || "emergency@themyth.network";

  const sender = {
    name: fromName,
    address: fromAddress,
  };

  const emailParams: EmailParams = {
    name: params.name,
    age: params.age,
    location: params.location,
    email: params.email,
    grievance: params.grievance,
    transmissionId: params.transmissionId,
    submittedAt: params.submittedAt,
  };

  const ownerContent = createOwnerEmail(emailParams);
  const visitorContent = createVisitorConfirmationEmail({
    name: params.name,
    grievance: params.grievance,
    transmissionId: params.transmissionId,
    submittedAt: params.submittedAt,
  });

  // Concurrent email execution to eliminate sequential waiting
  const sendOwnerNotification = async (): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    const start = performance.now();
    try {
      const info = await transporter.sendMail({
        from: sender,
        to: ownerEmail,
        subject: `Someone Needs Your Help — The Myth [Ref: ${params.transmissionId}]`,
        html: ownerContent.html,
        text: ownerContent.text,
      });
      const elapsed = Math.round(performance.now() - start);
      console.log(`[Gmail SMTP] Owner email: ${elapsed}ms`);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      const elapsed = Math.round(performance.now() - start);
      console.error(`[Gmail SMTP] Owner email failed in ${elapsed}ms:`, err?.message || "Unknown SMTP error");
      return { success: false, error: err?.message };
    }
  };

  const sendVisitorConfirmation = async (): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    const start = performance.now();
    try {
      const info = await transporter.sendMail({
        from: sender,
        to: params.email,
        subject: "THE MYTH — Your Request Has Been Heard",
        html: visitorContent.html,
        text: visitorContent.text,
      });
      const elapsed = Math.round(performance.now() - start);
      console.log(`[Gmail SMTP] Visitor email: ${elapsed}ms`);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      const elapsed = Math.round(performance.now() - start);
      console.error(`[Gmail SMTP] Visitor email failed in ${elapsed}ms:`, err?.message || "Unknown SMTP error");
      return { success: false, error: err?.message };
    }
  };

  // Run both email dispatches concurrently
  const [ownerResult, visitorResult] = await Promise.all([
    sendOwnerNotification(),
    sendVisitorConfirmation(),
  ]);

  const totalElapsed = Math.round(performance.now() - overallStart);
  console.log(`[Gmail SMTP] Total: ${totalElapsed}ms`);

  // If owner email fails, transmission has failed
  if (!ownerResult.success) {
    throw new Error("Failed to dispatch owner notification email.");
  }

  // If owner succeeded but visitor failed, return partial failure gracefully
  if (!visitorResult.success) {
    return {
      success: false,
      ownerSuccess: true,
      visitorSuccess: false,
      ownerMessageId: ownerResult.messageId,
      error: "Visitor confirmation email failed to deliver.",
    };
  }

  return {
    success: true,
    ownerSuccess: true,
    visitorSuccess: true,
    ownerMessageId: ownerResult.messageId,
    visitorMessageId: visitorResult.messageId,
  };
}
