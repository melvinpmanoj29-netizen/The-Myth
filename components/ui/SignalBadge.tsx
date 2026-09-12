"use client";

import React from "react";
import { Radio } from "lucide-react";

interface SignalBadgeProps {
  label?: string;
  status?: "active" | "transmitting" | "standby";
  className?: string;
}

export function SignalBadge({
  label = "MYTH SIGNAL: ACTIVE",
  status = "active",
  className = "",
}: SignalBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase border transition-all duration-300 ${
        status === "active"
          ? "bg-charcoal-800/80 border-myth-cyan/40 text-myth-cyan-bright shadow-[0_0_12px_rgba(0,229,255,0.2)]"
          : status === "transmitting"
          ? "bg-myth-red/20 border-myth-red-bright/60 text-myth-red-bright animate-pulse"
          : "bg-charcoal-800 border-charcoal-600 text-text-muted"
      } ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            status === "active"
              ? "bg-myth-cyan"
              : status === "transmitting"
              ? "bg-myth-red-bright"
              : "bg-text-muted"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status === "active"
              ? "bg-myth-cyan-bright"
              : status === "transmitting"
              ? "bg-myth-red-bright"
              : "bg-text-muted"
          }`}
        />
      </span>
      <Radio className="w-3.5 h-3.5 opacity-80" />
      <span className="font-semibold text-[11px]">{label}</span>
    </div>
  );
}
