export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string | number;
}

export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: "A name carries power. Tell me what they call you." };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: "Even a whisper has more substance. Give me at least 2 characters." };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: "A name shouldn't be an essay. Keep it under 60 characters." };
  }
  return { isValid: true, sanitizedValue: trimmed };
}

export function validateAge(ageInput: string | number): ValidationResult {
  const parsed = typeof ageInput === "number" ? ageInput : parseInt(ageInput.trim(), 10);
  if (isNaN(parsed) || !Number.isInteger(parsed)) {
    return { isValid: false, error: "Speak in numbers. How many years have passed for you?" };
  }
  if (parsed < 5 || parsed > 130) {
    return { isValid: false, error: "A mortal's journey usually lies between 5 and 130 years. What is your true age?" };
  }
  return { isValid: true, sanitizedValue: parsed };
}

export function validateLocation(location: string): ValidationResult {
  const trimmed = location.trim();
  if (!trimmed) {
    return { isValid: false, error: "Every signal originates from somewhere. Where in the world are you?" };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: "Specify your city, country, or coordinates." };
  }
  if (trimmed.length > 100) {
    return { isValid: false, error: "Keep your origin concise (under 100 characters)." };
  }
  return { isValid: true, sanitizedValue: trimmed };
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!trimmed) {
    return { isValid: false, error: "I need a frequency to reach you. Enter your email address." };
  }
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: "That frequency is corrupted. Provide a valid email address (e.g., name@domain.com)." };
  }
  return { isValid: true, sanitizedValue: trimmed.toLowerCase() };
}

export function validateGrievance(grievance: string): ValidationResult {
  const trimmed = grievance.trim();
  if (!trimmed) {
    return { isValid: false, error: "Silence solves nothing. Lay your grievance before me." };
  }
  if (trimmed.length < 10) {
    return { isValid: false, error: "Give me enough depth to understand. Speak at least a sentence (10+ characters)." };
  }
  if (trimmed.length > 5000) {
    return { isValid: false, error: "Focus the core of your problem. Keep it under 5000 characters." };
  }
  return { isValid: true, sanitizedValue: trimmed };
}
