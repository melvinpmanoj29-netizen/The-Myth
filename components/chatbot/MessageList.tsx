"use client";

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chatbot";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, Radio } from "lucide-react";
import { Emblem } from "@/components/ui/Emblem";

interface MessageListProps {
  messages: ChatMessage[];
  isThinking: boolean;
}

export function MessageList({ messages, isThinking }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dedicated container-only scroll that never affects the window/document viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Smooth scroll only inside the chat message container
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  return (
    <div
      ref={containerRef}
      className="h-[380px] sm:h-[420px] overflow-y-auto p-4 sm:p-5 space-y-4 bg-charcoal-950/95 scroll-smooth focus:outline-none"
      style={{ overscrollBehavior: "contain" }}
    >
      <AnimatePresence initial={false}>
        {messages.map((msg) => {
          // In-chat transmission confirmed card
          if (msg.isConfirmationCard) {
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="my-3 mx-auto max-w-sm w-full"
              >
                <div className="bg-charcoal-900 border border-myth-cyan/70 rounded-lg p-4 shadow-[0_0_25px_rgba(0,217,255,0.2)] text-center relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-myth-cyan/15 border border-myth-cyan/40 text-myth-cyan-bright text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-myth-cyan-bright" />
                    TRANSMISSION CONFIRMED
                  </div>

                  <div className="bg-charcoal-950 rounded border border-charcoal-700 py-1.5 px-3 my-1 font-mono text-xs text-myth-cyan font-bold tracking-wider">
                    {msg.transmissionRef || "MYTH-SIG-ARCHIVED"}
                  </div>

                  <p className="text-xs text-text-primary italic mt-2">
                    &ldquo;Your message has reached me. I&apos;m still listening.&rdquo;
                  </p>
                </div>
              </motion.div>
            );
          }

          const isMyth = msg.sender === "myth";
          const isSystem = msg.sender === "system";

          if (isSystem) {
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center my-2"
              >
                <div className="px-3 py-1 rounded bg-charcoal-900 border border-charcoal-700 text-[10px] font-mono text-text-muted tracking-wider uppercase">
                  {msg.text}
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`flex gap-2.5 items-start ${isMyth ? "justify-start" : "justify-end"}`}
            >
              {/* Myth Avatar Emblem Box */}
              {isMyth && (
                <div className="w-7 h-7 rounded bg-charcoal-900 border border-myth-cyan/70 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(0,217,255,0.25)]">
                  <Emblem size={16} />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded p-3 sm:p-3.5 relative break-words ${
                  isMyth
                    ? "bg-charcoal-900/95 border border-charcoal-700 text-text-primary border-l-2 border-l-myth-cyan shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                    : "bg-myth-red/20 border border-myth-red-bright/50 text-white border-r-2 border-r-myth-red-bright shadow-[0_4px_16px_rgba(193,18,31,0.25)]"
                }`}
              >
                {/* Speaker Header & Timestamp */}
                <div className="flex items-center justify-between gap-2 sm:gap-4 mb-1.5 pb-1 border-b border-white/5">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 ${
                      isMyth ? "text-myth-cyan" : "text-myth-red-bright"
                    }`}
                  >
                    {!isMyth && <span className="w-1.5 h-1.5 rounded-full bg-myth-red-bright animate-pulse" />}
                    {isMyth ? "THE MYTH" : "YOU // VISITOR"}
                  </span>
                  <span className="text-[9px] font-mono text-text-muted">{msg.timestamp}</span>
                </div>

                {/* Message Body */}
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans font-normal text-text-primary break-words">
                  {msg.text}
                </div>
              </div>

              {/* Visitor Icon Box */}
              {!isMyth && (
                <div className="w-7 h-7 rounded bg-myth-red/30 border border-myth-red-bright/80 flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(255,31,45,0.35)]">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Typing / Thinking Indicator */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2.5 justify-start"
        >
          <div className="w-7 h-7 rounded bg-charcoal-900 border border-myth-cyan/70 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,217,255,0.25)]">
            <Radio className="w-3.5 h-3.5 animate-pulse text-myth-cyan" />
          </div>
          <div className="bg-charcoal-900 border border-charcoal-700 rounded px-3.5 py-2 text-xs font-mono text-myth-cyan flex items-center gap-2 shadow-md">
            <span className="tracking-wider uppercase text-[10px] font-bold">The Myth is listening</span>
            <div className="flex gap-1 items-center">
              <span className="w-1 h-1 rounded-full bg-myth-cyan animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1 h-1 rounded-full bg-myth-cyan animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1 h-1 rounded-full bg-myth-cyan animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
