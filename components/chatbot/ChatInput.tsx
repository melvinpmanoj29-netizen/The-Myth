"use client";

import React, { useState, useRef, useEffect } from "react";
import { ConversationStep } from "@/types/chatbot";
import { Send, AlertCircle } from "lucide-react";
import { soundManager } from "@/lib/sound";

interface ChatInputProps {
  currentStep: ConversationStep;
  onSubmit: (text: string) => void;
  disabled: boolean;
  errorMessage?: string;
}

export function ChatInput({
  currentStep,
  onSubmit,
  disabled,
  errorMessage,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focus with preventScroll to completely eliminate browser-level window scrolling
    if (!disabled && currentStep !== "COMPLETED" && currentStep !== "SUBMITTED") {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [disabled, currentStep]);

  const getPlaceholder = (step: ConversationStep): string => {
    switch (step) {
      case "WELCOME":
      case "NAME":
        return "Speak freely... The Myth is listening...";
      case "AGE":
        return "Enter your age...";
      case "LOCATION":
        return "Enter your city or location...";
      case "EMAIL":
        return "Enter your email address...";
      case "GRIEVANCE":
        return "Speak freely... The Myth is listening...";
      case "PROCESSING":
        return "Transmission in progress...";
      case "SUBMITTED":
        return "Transmission recorded.";
      case "COMPLETED":
        return "Speak freely... The Myth is listening...";
      default:
        return "Speak freely... The Myth is listening...";
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!value.trim() || disabled) return;

    soundManager.playTransmissionSend();
    onSubmit(value);
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    soundManager.playKeypress();
  };

  const isModalActive = currentStep === "SUBMITTED" || currentStep === "PROCESSING";

  return (
    <div className="bg-charcoal-900/95 border-t border-charcoal-800 p-3 sm:p-4">
      {errorMessage && (
        <div className="mb-2.5 px-3 py-1.5 rounded bg-myth-red/20 border border-myth-red-bright/50 text-myth-red-bright text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSend} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type={currentStep === "AGE" ? "number" : currentStep === "EMAIL" ? "email" : "text"}
            value={value}
            onChange={handleChange}
            placeholder={getPlaceholder(currentStep)}
            disabled={disabled || isModalActive}
            className="w-full bg-charcoal-950 border border-charcoal-700/90 focus:border-myth-cyan focus:ring-1 focus:ring-myth-cyan/40 text-text-primary placeholder:text-text-muted/50 text-xs sm:text-sm rounded px-4 py-3 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed font-sans"
          />
        </div>

        <button
          type="submit"
          disabled={!value.trim() || disabled || isModalActive}
          aria-label="Send message to The Myth"
          className="w-11 h-11 rounded bg-myth-red hover:bg-myth-red-bright text-white disabled:opacity-40 disabled:hover:bg-myth-red transition-all duration-200 border border-myth-red-bright/60 shadow-[0_0_15px_rgba(193,18,31,0.4)] hover:shadow-[0_0_22px_rgba(255,31,45,0.7)] flex items-center justify-center flex-shrink-0 active:scale-95"
        >
          <Send className="w-4 h-4 text-white fill-white" />
        </button>
      </form>
    </div>
  );
}
