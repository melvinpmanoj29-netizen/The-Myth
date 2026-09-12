import { NextRequest, NextResponse } from "next/server";
import { ConversationStep, VisitorData } from "@/types/chatbot";
import {
  validateName,
  validateAge,
  validateLocation,
  validateEmail,
  validateGrievance,
} from "@/lib/validation";
import { generateMythResponse } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      step,
      visitorInput,
      visitorData = {},
      history = [],
    }: {
      step: ConversationStep;
      visitorInput: string;
      visitorData: Partial<VisitorData>;
      history: Array<{ role: "user" | "assistant"; content: string }>;
    } = body;

    const input = (visitorInput || "").trim();

    // Deterministic state-based validation & next step transition
    let nextStep: ConversationStep = step;
    let extractedValue: string | number | undefined = undefined;
    let validationError: string | undefined = undefined;

    switch (step) {
      case "WELCOME":
      case "NAME": {
        const val = validateName(input);
        if (!val.isValid) {
          validationError = val.error;
        } else {
          extractedValue = val.sanitizedValue;
          nextStep = "AGE";
        }
        break;
      }

      case "AGE": {
        const val = validateAge(input);
        if (!val.isValid) {
          validationError = val.error;
        } else {
          extractedValue = val.sanitizedValue;
          nextStep = "LOCATION";
        }
        break;
      }

      case "LOCATION": {
        const val = validateLocation(input);
        if (!val.isValid) {
          validationError = val.error;
        } else {
          extractedValue = val.sanitizedValue;
          nextStep = "EMAIL";
        }
        break;
      }

      case "EMAIL": {
        const val = validateEmail(input);
        if (!val.isValid) {
          validationError = val.error;
        } else {
          extractedValue = val.sanitizedValue;
          nextStep = "GRIEVANCE";
        }
        break;
      }

      case "GRIEVANCE": {
        const val = validateGrievance(input);
        if (!val.isValid) {
          validationError = val.error;
        } else {
          extractedValue = val.sanitizedValue;
          nextStep = "PROCESSING";
        }
        break;
      }

      default:
        break;
    }

    if (validationError) {
      return NextResponse.json({
        success: false,
        mythReply: validationError,
        nextStep: step, // Remain on same step
        error: validationError,
      });
    }

    // Generate intelligent persona response with updated state via Gemini
    const { text: reply, isFallback } = await generateMythResponse({
      step: step === "WELCOME" ? "NAME" : step,
      visitorInput: input,
      visitorData: {
        ...visitorData,
        ...(step === "NAME" ? { name: String(extractedValue) } : {}),
      },
      history,
    });

    return NextResponse.json({
      success: true,
      mythReply: reply,
      nextStep,
      extractedValue,
      isFallback,
    });
  } catch (error: any) {
    console.error("[Chat API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        mythReply: "The signal encountered interference. Speak again.",
        nextStep: "ERROR",
        error: "Internal transmission interference",
      },
      { status: 500 }
    );
  }
}
