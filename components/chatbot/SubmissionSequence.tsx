"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Radio, CheckCircle2, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/sound";

interface SubmissionSequenceProps {
  transmissionId: string;
  visitorName: string;
  onDone: () => void;
}

export function SubmissionSequence({
  transmissionId,
  visitorName,
  onDone,
}: SubmissionSequenceProps) {
  const [phase, setPhase] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Cinematic multi-step progression
    const timer1 = setTimeout(() => {
      setPhase(2);
      soundManager.playMythReply();
    }, 1800);

    const timer2 = setTimeout(() => {
      setPhase(3);
      soundManager.playMythReply();
    }, 3600);

    const timer3 = setTimeout(() => {
      setPhase(4);
      soundManager.playSuccessTone();

      // Fire subtle cyan and red confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C1121F", "#FF2635", "#00E5FF", "#36F5FF", "#ffffff"],
        });
      } catch {
        // Confetti fallback
      }
    }, 5600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleCopyId = () => {
    if (!transmissionId) return;
    navigator.clipboard.writeText(transmissionId);
    setCopied(true);
    soundManager.playKeypress();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 bg-charcoal-900/95 border border-myth-cyan/40 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-myth-cyan/10 via-myth-red/10 to-transparent pointer-events-none" />

      {/* Pulsing Signal Radar Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-charcoal-800 border-2 border-myth-cyan flex items-center justify-center text-myth-cyan-bright shadow-[0_0_25px_rgba(0,229,255,0.4)]">
          {phase < 4 ? (
            <Radio className="w-8 h-8 animate-pulse text-myth-cyan-bright" />
          ) : (
            <CheckCircle2 className="w-8 h-8 text-myth-cyan-bright" />
          )}
        </div>
        {phase < 4 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-myth-red opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-myth-red-bright" />
          </span>
        )}
      </div>

      {/* Cinematic Phase Copy */}
      <div className="max-w-md w-full min-h-[160px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <div className="text-xs font-mono text-myth-cyan tracking-widest uppercase">
                THE MYTH // PROTOCOL
              </div>
              <p className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                &ldquo;Transmission received.&rdquo;
              </p>
              <p className="text-xs font-mono text-text-muted">
                Encrypting signal onto quantum resonance grid...
              </p>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <div className="text-xs font-mono text-myth-red-bright tracking-widest uppercase">
                THE ARCHIVE
              </div>
              <p className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                &ldquo;Reading your story, {visitorName}...&rdquo;
              </p>
              <p className="text-xs font-mono text-text-muted">
                Uncovering the problem beneath the problem...
              </p>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <div className="text-xs font-mono text-myth-cyan tracking-widest uppercase">
                THE SIGHT &amp; THE LISTENING
              </div>
              <p className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                &ldquo;Your voice has been heard.&rdquo;
              </p>
              <p className="text-sm text-text-muted italic max-w-sm">
                &ldquo;I can&apos;t promise every problem has an easy answer. But you don&apos;t have to face this one unheard.&rdquo;
              </p>
            </motion.div>
          )}

          {phase === 4 && (
            <motion.div
              key="phase-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3 w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-myth-cyan/10 border border-myth-cyan/40 text-myth-cyan-bright text-xs font-mono font-bold tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4" />
                REQUEST TRANSMITTED
              </div>

              <h3 className="font-display font-bold text-2xl text-white">
                Signal Secured in The Archive
              </h3>

              <div className="bg-charcoal-800 p-3 rounded border border-charcoal-700 flex items-center justify-between gap-3 text-left">
                <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase">Transmission Ref</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-myth-cyan tracking-wider">
                    {transmissionId}
                  </div>
                </div>
                <button
                  onClick={handleCopyId}
                  aria-label="Copy Transmission Reference ID"
                  className="p-2 rounded bg-charcoal-700 hover:bg-charcoal-600 text-text-primary hover:text-myth-cyan transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-myth-cyan" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs text-text-muted leading-relaxed max-w-md pt-1">
                An automatic notification beacon has been transmitted to <span className="text-myth-cyan font-mono">The Myth Network</span>. Keep your frequency open.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {phase === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-4 border-t border-charcoal-800 w-full flex justify-center"
        >
          <button
            onClick={onDone}
            className="px-6 py-2.5 rounded bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-600 hover:border-myth-cyan/50 text-xs font-mono tracking-wider uppercase text-text-primary transition-all duration-200"
          >
            RETURN TO TERMINAL
          </button>
        </motion.div>
      )}
    </div>
  );
}
