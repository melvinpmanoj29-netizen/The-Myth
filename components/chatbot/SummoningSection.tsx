"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ConversationStep, ChatMessage, VisitorData } from "@/types/chatbot";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import confetti from "canvas-confetti";
import { formatTimestamp, sleep } from "@/lib/utils";
import { soundManager } from "@/lib/sound";
import { Lock, AlertTriangle, RotateCcw, Shield, Radio, CheckCircle2, RefreshCw } from "lucide-react";

export function SummoningSection() {
  const [currentStep, setCurrentStep] = useState<ConversationStep>("WELCOME");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visitorData, setVisitorData] = useState<Partial<VisitorData>>({});
  const [isThinking, setIsThinking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [transmissionId, setTransmissionId] = useState<string>("");

  const initialOpeningExecuted = useRef(false);
  const isSubmittingChat = useRef(false);

  // Opening dialogue sequence
  const startSummoning = async () => {
    if (initialOpeningExecuted.current) return;
    initialOpeningExecuted.current = true;

    const openingLines = [
      "You found me.",
      "Most people come here looking for answers.",
      "Some come because nobody else listened.",
      "Either way...",
      "You've got my attention.",
      "What's your name?",
    ];

    for (let i = 0; i < openingLines.length; i++) {
      setIsThinking(true);
      await sleep(i === 0 ? 250 : i === 4 ? 350 : 400);
      setIsThinking(false);

      soundManager.playMythReply();
      setMessages((prev) => [
        ...prev,
        {
          id: `open-${i}-${Date.now()}`,
          sender: "myth",
          text: openingLines[i],
          timestamp: formatTimestamp(),
          step: i === openingLines.length - 1 ? "NAME" : "WELCOME",
        },
      ]);

      await sleep(150);
    }

    setCurrentStep("NAME");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startSummoning();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleVisitorSubmit = async (text: string) => {
    if (isSubmittingChat.current || isThinking || isProcessing) return;
    isSubmittingChat.current = true;

    setErrorMessage(undefined);
    setSubmissionFailed(false);

    // Append visitor message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "visitor",
      text,
      timestamp: formatTimestamp(),
      step: currentStep,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const history = messages.slice(-4).map((m) => ({
        role: m.sender === "visitor" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));
      history.push({ role: "user", content: text });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: currentStep,
          visitorInput: text,
          visitorData,
          history,
        }),
      });

      const data = await response.json();
      setIsThinking(false);

      if (!response.ok || !data.success || data.error) {
        setErrorMessage(data.error || "Communication interference detected.");
        soundManager.playErrorAlert();
        if (data.mythReply) {
          setMessages((prev) => [
            ...prev,
            {
              id: `myth-err-${Date.now()}`,
              sender: "myth",
              text: data.mythReply,
              timestamp: formatTimestamp(),
              step: currentStep,
            },
          ]);
        }
        return;
      }

      // Update visitor data object with extracted sanitized value
      const updatedData: Partial<VisitorData> = { ...visitorData };
      if (currentStep === "NAME" && data.extractedValue) {
        updatedData.name = String(data.extractedValue);
      } else if (currentStep === "AGE" && data.extractedValue) {
        updatedData.age = Number(data.extractedValue);
      } else if (currentStep === "LOCATION" && data.extractedValue) {
        updatedData.location = String(data.extractedValue);
      } else if (currentStep === "EMAIL" && data.extractedValue) {
        updatedData.email = String(data.extractedValue);
      } else if (currentStep === "GRIEVANCE" && data.extractedValue) {
        updatedData.grievance = String(data.extractedValue);
      }
      setVisitorData(updatedData);

      soundManager.playMythReply();
      setMessages((prev) => [
        ...prev,
        {
          id: `myth-${Date.now()}`,
          sender: "myth",
          text: data.mythReply,
          timestamp: formatTimestamp(),
          step: data.nextStep,
        },
      ]);

      // Trigger submission ONLY when grievance step is completed
      if (currentStep === "GRIEVANCE" || data.nextStep === "PROCESSING") {
        await executeFinalSubmission(updatedData);
      } else if (currentStep !== "COMPLETED" && currentStep !== "SUBMITTED") {
        setCurrentStep(data.nextStep);
      }
    } catch (err: any) {
      setIsThinking(false);
      soundManager.playErrorAlert();
      setErrorMessage("The link was interrupted. Please re-send your message.");
      console.error("[Summoning Submit Error]:", err);
    } finally {
      isSubmittingChat.current = false;
    }
  };

  const executeFinalSubmission = async (completeData: Partial<VisitorData>) => {
    setCurrentStep("PROCESSING");
    setIsProcessing(true);
    setSubmissionFailed(false);
    setErrorMessage(undefined);

    try {
      const payload = {
        name: completeData.name || "Anonymous",
        age: completeData.age || 25,
        location: completeData.location || "Unknown Coordinates",
        email: completeData.email || "",
        grievance: completeData.grievance || "",
      };

      const res = await fetch("/api/submit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setIsProcessing(false);

      if (res.ok && result.success) {
        const txId = result.transmissionId || "MYTH-SIG-9999";
        setTransmissionId(txId);
        setSubmissionFailed(false);
        soundManager.playSuccessTone();

        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#C1121F", "#FF1F2D", "#00D9FF", "#00E5FF", "#ffffff"],
          });
        } catch {
          // ignore
        }

        const name = completeData.name || "traveler";

        // Append in-chat transmission confirmed card and follow-up prompt
        setMessages((prev) => [
          ...prev,
          {
            id: `tx-conf-${Date.now()}`,
            sender: "system",
            text: "TRANSMISSION CONFIRMED",
            timestamp: formatTimestamp(),
            step: "COMPLETED",
            isConfirmationCard: true,
            transmissionRef: txId,
          },
          {
            id: `myth-followup-${Date.now() + 1}`,
            sender: "myth",
            text: `Your signal has reached me, ${name}.\nI'm still listening. What else do you want me to know?`,
            timestamp: formatTimestamp(),
            step: "COMPLETED",
          },
        ]);

        // Enter continuous post-submission conversation mode
        setCurrentStep("COMPLETED");
      } else {
        soundManager.playErrorAlert();
        setSubmissionFailed(true);
        setErrorMessage(
          result.error ||
            "Transmission interrupted. Your message has not been lost. Try again."
        );
        setCurrentStep("GRIEVANCE");
      }
    } catch (err) {
      setIsProcessing(false);
      soundManager.playErrorAlert();
      setSubmissionFailed(true);
      setErrorMessage(
        "Transmission interrupted. The network frequency was severed. Your message has not been lost. Try again."
      );
      setCurrentStep("GRIEVANCE");
    }
  };

  const handleRetrySubmission = () => {
    soundManager.playTransmissionSend();
    executeFinalSubmission(visitorData);
  };

  const handleReset = () => {
    soundManager.playKeypress();
    initialOpeningExecuted.current = false;
    isSubmittingChat.current = false;
    setMessages([]);
    setVisitorData({});
    setErrorMessage(undefined);
    setSubmissionFailed(false);
    setTransmissionId("");
    setCurrentStep("WELCOME");
    startSummoning();
  };

  return (
    <section
      id="summon"
      className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-950 border-t border-charcoal-800 overflow-hidden tech-grid-bg flex flex-col justify-center"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-myth-red/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-myth-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-20">
        {/* Main Terminal Shell matching Reference Design */}
        <div className="relative rounded-lg border border-myth-red/70 shadow-[0_0_40px_rgba(193,18,31,0.25),0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden bg-charcoal-950">
          
          {/* TERMINAL TOP HEADER BAR */}
          <div className="bg-charcoal-900/95 border-b border-charcoal-800 px-4 py-3 sm:px-6 flex items-center justify-between">
            {/* Left: Terminal Title with Glowing Red Dot */}
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-myth-red-bright animate-pulse shadow-[0_0_8px_rgba(255,31,45,0.8)]" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.18em] text-white uppercase">
                MYTH SIGNAL TERMINAL
              </span>
            </div>

            {/* Right / Center: Reset Button, Lock status, Waveform, Frequency ID */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Reset Transmission Connection Button */}
              <button
                onClick={handleReset}
                disabled={isProcessing || isThinking}
                title="Reset Transmission Connection"
                aria-label="Reset Transmission Connection"
                className="px-2 py-1 rounded border border-charcoal-700 bg-charcoal-950/80 hover:border-myth-red/70 hover:text-myth-red-bright text-text-muted transition-colors disabled:opacity-50 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isProcessing || isThinking ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">RESET</span>
              </button>

              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-myth-cyan tracking-wider uppercase">
                <Lock className="w-3.5 h-3.5 text-myth-cyan" />
                <span className="hidden sm:inline">SECURE CONNECTION</span>
              </div>

              {/* Dynamic Waveform */}
              <div className="flex items-center gap-[2px] h-4 px-1.5 py-0.5 bg-charcoal-950/80 rounded border border-charcoal-700">
                <span className="w-[2px] h-2 bg-myth-red-bright animate-pulse" style={{ animationDelay: "0ms" }} />
                <span className="w-[2px] h-3.5 bg-myth-red-bright animate-pulse" style={{ animationDelay: "150ms" }} />
                <span className="w-[2px] h-1.5 bg-myth-cyan animate-pulse" style={{ animationDelay: "300ms" }} />
                <span className="w-[2px] h-4 bg-myth-red-bright animate-pulse" style={{ animationDelay: "450ms" }} />
                <span className="w-[2px] h-2.5 bg-myth-cyan animate-pulse" style={{ animationDelay: "200ms" }} />
                <span className="w-[2px] h-1.5 bg-myth-red-bright animate-pulse" style={{ animationDelay: "100ms" }} />
              </div>

              {/* Terminal Unit ID */}
              <span className="text-xs font-mono font-bold text-myth-red-bright tracking-widest uppercase">
                MYTH-01
              </span>
            </div>
          </div>

          {/* MAIN 3-COLUMN TERMINAL LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-charcoal-800">
            
            {/* LEFT COLUMN: THE MYTH PROFILE & ACTIONS */}
            <div className="lg:col-span-3 p-4 sm:p-5 bg-charcoal-900/60 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Character Portrait Box */}
                <div className="relative w-full max-w-[140px] sm:max-w-[160px] mx-auto aspect-square rounded overflow-hidden border border-myth-cyan/60 bg-charcoal-950 shadow-[0_0_15px_rgba(0,217,255,0.2)]">
                  <Image
                    src="/images/the-myth-avatar.jpg"
                    alt="The Myth Avatar"
                    fill
                    sizes="160px"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Character Name */}
                <div className="text-center">
                  <h3 className="font-display font-black text-sm tracking-widest text-white uppercase">
                    THE MYTH
                  </h3>
                </div>

                {/* Action Items List */}
                <div className="space-y-1.5 pt-2">
                  <div className="px-3 py-2 rounded bg-myth-red/20 border border-myth-red text-myth-red-bright font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-between">
                    <span>LISTEN</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-myth-red-bright animate-ping" />
                  </div>
                  <div className="px-3 py-2 rounded bg-charcoal-950/40 text-text-muted font-mono text-xs tracking-widest uppercase hover:text-white transition-colors">
                    UNDERSTAND
                  </div>
                  <div className="px-3 py-2 rounded bg-charcoal-950/40 text-text-muted font-mono text-xs tracking-widest uppercase hover:text-white transition-colors">
                    STAND
                  </div>
                  <div className="px-3 py-2 rounded bg-charcoal-950/40 text-text-muted font-mono text-xs tracking-widest uppercase hover:text-white transition-colors">
                    PROTECT
                  </div>
                  <div className="px-3 py-2 rounded bg-charcoal-950/40 text-text-muted font-mono text-xs tracking-widest uppercase hover:text-white transition-colors">
                    EMPOWER
                  </div>
                </div>
              </div>

              {/* Bottom Signal Strength Indicator */}
              <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between text-[10px] font-mono text-text-muted uppercase">
                <span className="text-myth-cyan font-semibold">SIGNAL STRENGTH</span>
                <div className="flex items-end gap-1 h-3">
                  <span className="w-1 h-1 bg-myth-cyan rounded-sm" />
                  <span className="w-1 h-1.5 bg-myth-cyan rounded-sm" />
                  <span className="w-1 h-2 bg-myth-cyan rounded-sm" />
                  <span className="w-1 h-2.5 bg-myth-red-bright rounded-sm" />
                  <span className="w-1 h-3 bg-myth-red-bright rounded-sm" />
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: LIVE CHAT STREAM & INPUT */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-charcoal-950/90 relative">
              {/* Retry Alert Banner if backend email dispatch failed */}
              {submissionFailed && (
                <div className="bg-myth-red/20 border-b border-myth-red-bright/50 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-left z-20">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-myth-red-bright flex-shrink-0" />
                    <div>
                      <div className="text-xs font-mono font-bold text-myth-red-bright uppercase">
                        TRANSMISSION INTERRUPTION
                      </div>
                      <div className="text-[11px] text-text-primary">
                        Your message has not been lost. You can resend your transmission now.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleRetrySubmission}
                    disabled={isProcessing}
                    className="px-3 py-1.5 rounded bg-myth-red hover:bg-myth-red-bright text-white text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border border-myth-red-bright/60 shadow-sm flex-shrink-0 disabled:opacity-50"
                  >
                    <RotateCcw className="w-3 h-3" />
                    RETRY
                  </button>
                </div>
              )}

              {/* Chat Message Stream */}
              <MessageList messages={messages} isThinking={isThinking} />

              {/* Chat Input */}
              <ChatInput
                currentStep={currentStep}
                onSubmit={handleVisitorSubmit}
                disabled={isThinking || isProcessing}
                errorMessage={errorMessage}
              />
            </div>

            {/* RIGHT COLUMN: RADAR & TELEMETRY */}
            <div className="lg:col-span-3 p-4 sm:p-5 bg-charcoal-900/60 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Circular Radar HUD Graphic */}
                <div className="flex justify-center pt-2">
                  <div className="relative w-24 h-24 rounded-full border border-myth-cyan/40 bg-charcoal-950 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,217,255,0.15)]">
                    {/* Concentric radar rings */}
                    <div className="absolute w-16 h-16 rounded-full border border-myth-cyan/30" />
                    <div className="absolute w-8 h-8 rounded-full border border-myth-cyan/20" />
                    <div className="absolute w-full h-[1px] bg-myth-cyan/20" />
                    <div className="absolute h-full w-[1px] bg-myth-cyan/20" />
                    
                    {/* Sweeping Radar Line */}
                    <div
                      className="absolute w-12 h-12 top-0 right-0 origin-bottom-left bg-gradient-to-tr from-transparent to-myth-cyan/30 animate-spin"
                      style={{ animationDuration: "4s" }}
                    />
                    
                    {/* Blip */}
                    <span className="w-1.5 h-1.5 rounded-full bg-myth-red-bright animate-ping" />
                  </div>
                </div>

                {/* Telemetry Metrics */}
                <div className="space-y-3.5 pt-2">
                  <div>
                    <div className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
                      FREQUENCY
                    </div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      MYTH-01
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
                      STATUS
                    </div>
                    <div className="text-xs font-mono font-bold text-myth-cyan uppercase tracking-wider">
                      LISTENING
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
                      TRANSMISSION
                    </div>
                    <div className="text-xs font-mono font-bold text-myth-cyan uppercase tracking-wider">
                      SECURE
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
                      THREAT
                    </div>
                    <div className="text-xs font-mono font-bold text-myth-cyan uppercase tracking-wider">
                      NONE
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Archival Status */}
              <div className="pt-4 border-t border-charcoal-800 text-[10px] font-mono text-text-muted uppercase">
                <span className="text-white font-semibold">256-BIT</span> QUANTUM LINK
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
