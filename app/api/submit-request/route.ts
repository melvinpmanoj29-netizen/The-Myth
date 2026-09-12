import { NextRequest, NextResponse } from "next/server";
import { HelpRequestPayload, HelpRequestResponse } from "@/types/visitor";
import {
  validateName,
  validateAge,
  validateLocation,
  validateEmail,
  validateGrievance,
} from "@/lib/validation";
import { sendHelpRequestEmails } from "@/lib/email";
import { formatTransmissionId } from "@/lib/utils";

// Lightweight duplicate submission guard (cleans up entries older than 2 minutes)
const recentSubmissions = new Map<string, number>();

function isDuplicateSubmission(email: string, grievance: string): boolean {
  const key = `${email.toLowerCase()}:${grievance.trim().slice(0, 50)}`;
  const now = Date.now();
  const lastTime = recentSubmissions.get(key);

  // Clean old records periodically
  if (recentSubmissions.size > 200) {
    for (const [k, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > 120000) {
        recentSubmissions.delete(k);
      }
    }
  }

  if (lastTime && now - lastTime < 60000) {
    return true;
  }

  recentSubmissions.set(key, now);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body: HelpRequestPayload = await req.json();
    const { name, age, location, email, grievance } = body;

    // Strict server-side validation
    const nameVal = validateName(name || "");
    const ageVal = validateAge(age ?? "");
    const locVal = validateLocation(location || "");
    const emailVal = validateEmail(email || "");
    const grievVal = validateGrievance(grievance || "");

    const errors: Record<string, string> = {};
    if (!nameVal.isValid) errors.name = nameVal.error!;
    if (!ageVal.isValid) errors.age = ageVal.error!;
    if (!locVal.isValid) errors.location = locVal.error!;
    if (!emailVal.isValid) errors.email = emailVal.error!;
    if (!grievVal.isValid) errors.grievance = grievVal.error!;

    if (Object.keys(errors).length > 0) {
      return NextResponse.json<HelpRequestResponse>(
        {
          success: false,
          message: "Transmission payload failed validation checks.",
          error: Object.values(errors)[0],
          details: errors,
        },
        { status: 400 }
      );
    }

    const sanitizedEmail = emailVal.sanitizedValue as string;
    const sanitizedGrievance = grievVal.sanitizedValue as string;

    // Duplicate submission guard
    if (isDuplicateSubmission(sanitizedEmail, sanitizedGrievance)) {
      return NextResponse.json<HelpRequestResponse>(
        {
          success: false,
          message: "Duplicate transmission detected. Your story is already recorded.",
          error: "A transmission with these details was recently sent. Please wait before resending.",
        },
        { status: 429 }
      );
    }

    const transmissionId = formatTransmissionId();
    const submittedAt = new Date().toUTCString();

    // Trigger dual Gmail SMTP email dispatch (Owner notification + Visitor confirmation)
    const dispatchResult = await sendHelpRequestEmails({
      name: nameVal.sanitizedValue as string,
      age: ageVal.sanitizedValue as number,
      location: locVal.sanitizedValue as string,
      email: sanitizedEmail,
      grievance: sanitizedGrievance,
      transmissionId,
      submittedAt,
    });

    if (!dispatchResult.success) {
      if (dispatchResult.ownerSuccess && !dispatchResult.visitorSuccess) {
        return NextResponse.json<HelpRequestResponse>(
          {
            success: false,
            message: "Transmission partially delivered. Visitor confirmation could not be sent.",
            error: "Your request reached The Myth, but confirmation could not be sent to your email. Please check your email address.",
            transmissionId,
            submittedAt,
          },
          { status: 502 }
        );
      }

      return NextResponse.json<HelpRequestResponse>(
        {
          success: false,
          message: "Transmission failed. Please try again.",
          error: "Transmission interrupted. The dispatch service is currently unavailable or unconfigured. Please retry.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json<HelpRequestResponse>({
      success: true,
      message: "Request transmitted successfully.",
      transmissionId,
      submittedAt,
    });
  } catch (error: any) {
    console.error("[Submit Request API Server Error]:", error?.message || error);
    return NextResponse.json<HelpRequestResponse>(
      {
        success: false,
        message: "Transmission failed. Please try again.",
        error: "Transmission interrupted. The dispatch service is currently unavailable or unconfigured. Please retry.",
      },
      { status: 500 }
    );
  }
}
