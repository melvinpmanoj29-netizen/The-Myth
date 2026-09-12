export interface VisitorRequest {
  name: string;
  age: number;
  location: string;
  email: string;
  grievance: string;
  submittedAt?: string;
  transmissionId?: string;
}

export type HelpRequestPayload = VisitorRequest;

export interface HelpRequestResponse {
  success: boolean;
  message: string;
  transmissionId?: string;
  submittedAt?: string;
  error?: string;
  details?: Record<string, string>;
}
