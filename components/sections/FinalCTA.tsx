"use client";

import React from "react";
import { ShieldAlert, ChevronRight, Radio } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function FinalCTA() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-charcoal-900 border-t border-charcoal-700/60 overflow-hidden text-center">
      {/* Dual Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-myth-red/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-myth-cyan/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-myth-cyan/50 bg-charcoal-800/90 text-myth-cyan-bright text-xs font-mono tracking-widest uppercase">
          <Radio className="w-3.5 h-3.5 animate-ping text-myth-cyan" />
          OPEN TRANSMISSION FREQUENCY
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-none">
            YOU HAVE A STORY.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-myth-red-bright via-white to-myth-cyan">
              THE MYTH IS LISTENING.
            </span>
          </h2>
          <p className="text-base sm:text-xl text-text-muted max-w-xl mx-auto font-sans pt-4">
            Do not let your burden dissolve into silence. Step onto the frequency and summon the one who understands.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <a
            href="#summon"
            onClick={() => soundManager.playTransmissionSend()}
            className="group inline-flex items-center gap-3 px-10 py-5 text-base font-mono font-bold tracking-wider uppercase text-white bg-myth-red hover:bg-myth-red-bright rounded-lg border border-myth-red-bright/60 shadow-[0_0_30px_rgba(193,18,31,0.6)] hover:shadow-[0_0_50px_rgba(255,38,53,0.9)] transition-all duration-300 active:scale-95"
          >
            <ShieldAlert className="w-5 h-5 text-myth-cyan-bright group-hover:scale-110 transition-transform" />
            SUMMON THE MYTH
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
