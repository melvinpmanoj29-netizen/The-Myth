"use client";

import React from "react";
import { Ear, ShieldCheck, Sun } from "lucide-react";

export function ValuesSection() {
  const pillars = [
    {
      id: "heard",
      title: "BE HEARD",
      text: "Your story matters. Every voice is welcome here.",
      icon: Ear,
    },
    {
      id: "understood",
      title: "BE UNDERSTOOD",
      text: "No judgment. Just someone who truly listens.",
      icon: ShieldCheck,
    },
    {
      id: "tomorrow",
      title: "A BRIGHTER TOMORROW",
      text: "A kinder, stronger world starts with you.",
      icon: Sun,
    },
  ];

  return (
    <section id="values" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-charcoal-950 border-t border-charcoal-800 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-myth-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 md:gap-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="flex items-center gap-3.5 sm:gap-5 text-left group p-2.5 sm:p-3 rounded-lg hover:bg-charcoal-900/40 transition-colors"
              >
                {/* Red Circular Ring Icon Container with Rotating Energy Border */}
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border border-myth-red/40 group-hover:border-myth-red-bright/80 group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute -inset-1 rounded-full border border-dashed border-myth-red-bright/30 group-hover:border-myth-cyan/60 animate-spin transition-colors duration-500" style={{ animationDuration: "12s" }} />
                  <div className="w-full h-full rounded-full bg-charcoal-900 flex items-center justify-center shadow-[0_0_20px_rgba(193,18,31,0.3)] group-hover:shadow-[0_0_30px_rgba(255,31,45,0.6)] transition-shadow">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-myth-red-bright group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="font-mono font-bold text-xs sm:text-base text-white tracking-wider sm:tracking-widest uppercase group-hover:text-myth-cyan transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
