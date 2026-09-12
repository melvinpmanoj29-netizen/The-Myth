"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function AudioToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(soundManager.getMuted());
  }, []);

  const handleToggle = () => {
    const isNowMuted = soundManager.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      soundManager.playKeypress();
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={muted ? "Unmute HUD audio feedback" : "Mute HUD audio feedback"}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border border-charcoal-600 bg-charcoal-800/80 hover:border-myth-cyan/50 hover:text-myth-cyan text-text-muted transition-all duration-200"
      title={muted ? "Audio Muted (Click to enable HUD sounds)" : "Audio Active (Click to mute)"}
    >
      {muted ? (
        <VolumeX className="w-3.5 h-3.5 text-text-muted" />
      ) : (
        <div className="flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-myth-cyan" />
          <span className="flex gap-0.5 items-end h-2.5">
            <span className="w-0.5 h-1.5 bg-myth-cyan animate-pulse" />
            <span className="w-0.5 h-2.5 bg-myth-cyan animate-pulse delay-75" />
            <span className="w-0.5 h-1 bg-myth-cyan animate-pulse delay-150" />
          </span>
        </div>
      )}
      <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
        {muted ? "SFX: OFF" : "SFX: ON"}
      </span>
    </button>
  );
}
