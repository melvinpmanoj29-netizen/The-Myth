"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Square } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function MissionSection() {
  const handleStartTransmission = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    soundManager.playTransmissionSend();
    const summonElement = document.getElementById("summon");
    if (summonElement) {
      summonElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const actionSteps = [
    "LISTEN",
    "UNDERSTAND",
    "STAND",
    "PROTECT",
    "EMPOWER",
  ];

  return (
    <section
      id="mission"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-950 border-t border-charcoal-800 overflow-hidden"
    >
      {/* Red Moon Atmospheric Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 sm:w-[400px] h-72 sm:h-[400px] bg-myth-red/20 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 sm:w-[300px] h-64 sm:h-[300px] bg-myth-cyan/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* Cinematic Background Backdrop Simulation */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <Image
          src="/images/myth_footer.png"
          alt="The Myth Overlooking Futuristic City Under Red Moon"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/90" />
      </div>

      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center Content */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] text-text-muted uppercase">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-myth-red-bright inline-block" />
              <span>MORE THAN A LISTENER</span>
            </div>

            {/* Giant Title */}
            <div className="space-y-1">
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl uppercase tracking-tight text-white leading-none">
                A STRONGER
                <br />
                <span className="text-myth-red-bright text-glow-red">
                  TOMORROW
                </span>
              </h2>
            </div>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-base text-text-muted max-w-xl font-sans leading-relaxed">
              Pain loses its power when it&apos;s heard.
              <br className="hidden sm:inline" />
              Speak, and take the first step toward a brighter tomorrow.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#summon"
                onClick={handleStartTransmission}
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white bg-myth-red hover:bg-myth-red-bright rounded border border-myth-red-bright/70 shadow-[0_0_25px_rgba(193,18,31,0.55)] hover:shadow-[0_0_40px_rgba(255,31,45,0.85)] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>START YOUR TRANSMISSION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Action Steps Pillar */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="flex flex-wrap lg:flex-col gap-2 sm:gap-3 lg:space-y-2 text-left sm:text-right border-l lg:border-l-0 lg:border-r border-charcoal-700/80 pl-3 sm:pl-4 lg:pl-0 lg:pr-4">
              {actionSteps.map((step) => (
                <div
                  key={step}
                  className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-text-muted hover:text-white uppercase transition-colors px-2 py-1 lg:p-0 rounded lg:rounded-none bg-charcoal-900/60 lg:bg-transparent border border-charcoal-800 lg:border-0"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
