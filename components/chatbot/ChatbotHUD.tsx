"use client";

import React from "react";
import Image from "next/image";
import { ConversationStep } from "@/types/chatbot";
import { Radio, RefreshCw, Cpu, ShieldCheck } from "lucide-react";
import { soundManager } from "@/lib/sound";

interface ChatbotHUDProps {
  currentStep: ConversationStep;
  progressPercent: number;
  onReset: () => void;
  isProcessing: boolean;
}

export function ChatbotHUD({
  currentStep,
  progressPercent,
  onReset,
  isProcessing,
}: ChatbotHUDProps) {
  const getStepLabel = (step: ConversationStep): { label: string; stage: string } => {
    switch (step) {
      case "WELCOME":
      case "NAME":
        return { label: "PROTOCOL 01/05", stage: "VISITOR IDENTITY" };
      case "AGE":
        return { label: "PROTOCOL 02/05", stage: "TEMPORAL ORIGIN" };
      case "LOCATION":
        return { label: "PROTOCOL 03/05", stage: "GEOGRAPHIC BEACON" };
      case "EMAIL":
        return { label: "PROTOCOL 04/05", stage: "RESONANCE FREQUENCY" };
      case "GRIEVANCE":
        return { label: "PROTOCOL 05/05", stage: "CORE GRIEVANCE" };
      case "PROCESSING":
        return { label: "ENCRYPTING", stage: "ARCHIVING TRANSMISSION" };
      case "SUBMITTED":
      case "COMPLETED":
        return { label: "SYNCHRONIZED", stage: "LINK RECORDED" };
      default:
        return { label: "STANDBY", stage: "AWAITING TRANSMISSION" };
    }
  };

  const { label, stage } = getStepLabel(currentStep);

  return (
    <div className="bg-charcoal-800/95 border-b border-charcoal-700/80 p-4 sm:p-5 flex flex-col gap-3.5 shadow-md">
      {/* Top Status Indicators */}
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-text-muted uppercase border-b border-charcoal-700/60 pb-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-myth-cyan font-bold">
            <span className="w-2 h-2 rounded-full bg-myth-cyan-bright animate-pulse" />
            SIGNAL: ACTIVE
          </span>
          <span className="hidden sm:inline text-charcoal-500">|</span>
          <span className="hidden sm:inline text-text-muted">FREQUENCY: MYTH-01</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-myth-red-bright font-bold">STATUS: LISTENING</span>
          <span className="hidden sm:inline text-charcoal-500">|</span>
          <span className="hidden sm:inline text-myth-cyan">TRANSMISSION: SECURE</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Avatar + Character Info */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded overflow-hidden border border-myth-cyan/70 shadow-[0_0_15px_rgba(0,229,255,0.35)] bg-charcoal-900 flex-shrink-0">
            <Image
              src="/images/the-myth-avatar.jpg"
              alt="The Myth Avatar"
              fill
              sizes="48px"
              className="object-cover"
            />
            {/* Live status dot on avatar */}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-myth-cyan border border-charcoal-900 rounded-full animate-ping" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-myth-cyan border border-charcoal-900 rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-base text-text-primary tracking-wider uppercase">
                THE MYTH
              </span>
              <span className="px-1.5 py-0.5 rounded bg-myth-red/20 text-myth-red-bright text-[9px] font-mono font-bold tracking-widest uppercase border border-myth-red/40">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-1 text-myth-cyan text-[11px]">
                <Radio className="w-3 h-3 text-myth-cyan animate-pulse" />
                DIRECT FREQUENCY
              </span>
              <span>&bull;</span>
              <span className="text-text-muted text-[11px] hidden sm:inline">256-BIT QUANTUM LINK</span>
            </div>
          </div>
        </div>

        {/* Right HUD Controls & Step Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-mono text-myth-cyan font-bold tracking-widest uppercase">
              {label}
            </div>
            <div className="text-xs font-mono text-text-primary uppercase tracking-wider">
              {stage}
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playKeypress();
              onReset();
            }}
            disabled={isProcessing}
            title="Reset Transmission Connection"
            aria-label="Reset Transmission Connection"
            className="p-2 rounded border border-charcoal-600 bg-charcoal-700/60 hover:border-myth-cyan hover:text-myth-cyan text-text-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar HUD Line */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono text-text-muted uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-myth-cyan" />
            SYNAPSE LINK
          </span>
          <span className="text-myth-cyan font-bold">{progressPercent}% COMPLETE</span>
        </div>
        <div className="w-full h-1.5 bg-charcoal-900 rounded-full overflow-hidden border border-charcoal-700/60">
          <div
            className="h-full bg-gradient-to-r from-myth-red via-myth-red-bright to-myth-cyan transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
