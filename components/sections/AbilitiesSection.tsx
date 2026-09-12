"use client";

import React from "react";
import { Headphones, Eye, Archive, Send, Activity, ShieldCheck } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function AbilitiesSection() {
  const abilities = [
    {
      id: "01",
      name: "THE LISTENING",
      tagline: "Nothing said to The Myth disappears.",
      description:
        "An absolute auditory and psychic sensitivity that registers emotional vibrations across distance. When you submit your voice, it bypasses the world's static and lands directly in his consciousness.",
      icon: Headphones,
      color: "text-myth-cyan",
      glow: "hover:border-myth-cyan/70 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]",
      badge: "COGNITIVE RECEPTION",
    },
    {
      id: "02",
      name: "THE SIGHT",
      tagline: "He sees the problem beneath the problem.",
      description:
        "The ability to dismantle emotional decoys and social masks in real-time. Where someone claims anger or defeat, The Myth identifies the hidden vulnerability or structural barrier fueling it.",
      icon: Eye,
      color: "text-myth-red-bright",
      glow: "hover:border-myth-red-bright/70 hover:shadow-[0_0_30px_rgba(255,38,53,0.2)]",
      badge: "DEEP ANALYSIS",
    },
    {
      id: "03",
      name: "THE ARCHIVE",
      tagline: "Every story becomes part of something greater.",
      description:
        "A quantum memory index that cross-references patterns of human struggle across the globe. No grievance is treated as an isolated incident — your struggle contributes to systemic healing.",
      icon: Archive,
      color: "text-myth-cyan-bright",
      glow: "hover:border-myth-cyan/70 hover:shadow-[0_0_30px_rgba(54,245,255,0.2)]",
      badge: "DATA MATRIX",
    },
    {
      id: "04",
      name: "THE RESPONSE",
      tagline: "When someone asks for help, The Myth answers.",
      description:
        "The direct mobilization of emergency intervention, automated notification beacons, and targeted strategic guidance. You are never left shouting into an empty void.",
      icon: Send,
      color: "text-white",
      glow: "hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
      badge: "INTERVENTION",
    },
  ];

  return (
    <section
      id="abilities"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-950 border-t border-charcoal-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-myth-cyan uppercase">
            <span className="w-8 h-[1px] bg-myth-cyan" />
            05 // SIGNATURE CAPABILITIES
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
            POWERS BEYOND <span className="text-transparent bg-clip-text bg-gradient-to-r from-myth-cyan to-myth-red-bright">PHYSICAL FORCE</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed pt-2">
            The Myth does not rely on brute strength. His arsenal consists of four revolutionary resonance disciplines crafted to resolve deep-seated human dilemmas.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {abilities.map((ability) => {
            const Icon = ability.icon;
            return (
              <div
                key={ability.id}
                onMouseEnter={() => soundManager.playKeypress()}
                className={`p-8 rounded-2xl bg-charcoal-800/80 border border-charcoal-700 transition-all duration-300 group ${ability.glow} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-charcoal-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className={`w-6 h-6 ${ability.color}`} />
                      </div>
                      <span className="px-2 py-0.5 rounded bg-charcoal-900 text-[10px] font-mono text-text-muted uppercase border border-charcoal-700">
                        {ability.badge}
                      </span>
                    </div>
                    <span className="text-2xl font-mono font-black text-charcoal-600 group-hover:text-text-muted transition-colors">
                      {ability.id}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-wide mb-1 group-hover:text-myth-cyan-bright transition-colors">
                    {ability.name}
                  </h3>

                  <div className="text-sm font-mono text-myth-red-bright font-bold mb-4 tracking-wide">
                    &ldquo;{ability.tagline}&rdquo;
                  </div>

                  <p className="text-sm text-text-muted leading-relaxed font-sans">
                    {ability.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-charcoal-700/60 flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="flex items-center gap-1.5 text-myth-cyan">
                    <Activity className="w-3.5 h-3.5" />
                    RESONANCE OPTIMIZED
                  </span>
                  <span className="uppercase text-[11px]">ACTIVE PROTOCOL</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
