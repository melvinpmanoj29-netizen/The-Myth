export type ConversationStep =
  | "WELCOME"
  | "NAME"
  | "AGE"
  | "LOCATION"
  | "EMAIL"
  | "GRIEVANCE"
  | "PROCESSING"
  | "SUBMITTED"
  | "COMPLETED"
  | "ERROR";

export interface ChatMessage {
  id: string;
  sender: "myth" | "visitor" | "system";
  text: string;
  timestamp: string;
  step?: ConversationStep;
  isStreaming?: boolean;
  transmissionRef?: string;
  isConfirmationCard?: boolean;
}

export interface VisitorData {
  name: string;
  age: number | null;
  location: string;
  email: string;
  grievance: string;
  submittedAt?: string;
  transmissionId?: string;
}

export interface ChatApiRequest {
  step: ConversationStep;
  visitorInput: string;
  visitorData: Partial<VisitorData>;
  history: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface ChatApiResponse {
  mythReply: string;
  nextStep: ConversationStep;
  extractedValue?: string | number;
  error?: string;
}
