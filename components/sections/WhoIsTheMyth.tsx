"use client";

import React from "react";
import Image from "next/image";
import { UserCheck, HeartHandshake, Eye, Sparkles } from "lucide-react";

export function WhoIsTheMyth() {
  const traits = [
    {
      title: "OBSERVANT & CALM",
      description:
        "Where others see chaos and anger, The Myth sees the hidden wound. He operates in deliberate silence before speaking with piercing precision.",
      icon: Eye,
      accent: "text-myth-cyan",
      border: "border-myth-cyan/40",
    },
    {
      title: "RADICAL EMPATHY",
      description:
        "He does not judge mortal weakness or panic. Empathy is not a sentiment to him — it is a tactile, analytical superpower.",
      icon: HeartHandshake,
      accent: "text-myth-red-bright",
      border: "border-myth-red/40",
    },
    {
      title: "EMOTIONAL CONTROL",
      description:
        "Never childish. Never erratic. The Myth remains unshakeable in the darkest psychological storms.",
      icon: UserCheck,
      accent: "text-white",
      border: "border-charcoal-600",
    },
  ];

  return (
    <section
      id="who-is-myth"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-950 border-t border-charcoal-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-myth-cyan uppercase">
            <span className="w-8 h-[1px] bg-myth-cyan" />
            03 // IDENTITY DOSSIER
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
            WHO IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-myth-cyan to-white">THE MYTH?</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed pt-2">
            The Myth is an original superhero whose defining power is understanding people at their core — seeing through words, masks, and defenses to address the true problem beneath the problem.
          </p>
        </div>

        {/* Core Philosophy & Character Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-charcoal-600 bg-charcoal-800 p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
              <div className="relative w-full aspect-[4/5] sm:aspect-square rounded overflow-hidden">
                <Image
                  src="/images/the-myth-section.jpg"
                  alt="The Myth Identity Visual"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-myth-cyan font-bold tracking-wider uppercase">
                    NAME: UNKNOWN / &ldquo;THE MYTH&rdquo;
                  </span>
                  <span className="text-[10px] font-mono text-myth-red-bright uppercase px-2 py-0.5 rounded bg-myth-red/10 border border-myth-red/30 font-bold">
                    CLASS: EMPATHIC ARCHON
                  </span>
                </div>
                <p className="text-xs text-text-muted font-mono">
                  Signature: Layered Cyan Hair &bull; Crimson Geometric Marking &bull; Tactical Chassis
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Traits Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-lg bg-charcoal-800/70 border border-charcoal-700/80 backdrop-blur-md">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-myth-cyan" />
                The Philosophy of Resonance
              </h3>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                &ldquo;Physical wounds heal in time, but ignored voices fester into catastrophic breaking points. To save a person, you must first have the courage to listen to the truth they are terrified to say out loud.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {traits.map((trait) => {
                const Icon = trait.icon;
                return (
                  <div
                    key={trait.title}
                    className={`p-5 rounded-lg bg-charcoal-800/40 border ${trait.border} hover:bg-charcoal-800/90 transition-all duration-300 group`}
                  >
                    <Icon className={`w-6 h-6 ${trait.accent} mb-3 group-hover:scale-110 transition-transform`} />
                    <h4 className="font-mono font-bold text-xs sm:text-sm text-text-primary tracking-wider uppercase mb-2">
                      {trait.title}
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed font-sans">
                      {trait.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
