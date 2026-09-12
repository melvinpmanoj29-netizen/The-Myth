"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Emblem } from "@/components/ui/Emblem";
import {
  Radio,
  Eye,
  Zap,
  Shield,
  Activity,
  Archive,
  ArrowLeft,
  ArrowRight,
  Flame,
  Sparkles,
  Lock,
  Cpu,
  HeartPulse,
} from "lucide-react";
import { soundManager } from "@/lib/sound";

export default function AbilitiesPage() {
  const [selectedAbility, setSelectedAbility] = useState(0);

  const abilities = [
    {
      id: "01",
      code: "PROTOCOL-RESONANCE",
      name: "THE RESONANCE LISTENING",
      tagline: "Nothing said to The Myth disappears into the void.",
      category: "COGNITIVE RECEPTION",
      energyType: "Biological Frequency / Empathic Audio",
      powerLevel: 99,
      icon: Radio,
      accent: "text-myth-cyan",
      border: "border-myth-cyan/50",
      glow: "shadow-[0_0_30px_rgba(0,217,255,0.25)]",
      description:
        "An absolute auditory and psychic sensitivity that registers emotional vibrations across vast distances. When someone speaks or cries for help, their voice bypasses all digital static and lands directly within his consciousness.",
      mechanics: [
        "Cross-frequency emotional vibration tracking.",
        "Zero-latency detection of genuine human distress.",
        "Filters through deceptive noise to pinpoint true underlying pain.",
      ],
      quote:
        "Physical wounds heal in time, but ignored voices fester. To save someone, you must first have the courage to hear the truth.",
    },
    {
      id: "02",
      code: "PROTOCOL-SIGHT",
      name: "THE DEEP SIGHT",
      tagline: "He sees the problem beneath the problem.",
      category: "TACTICAL ANALYSIS",
      energyType: "Neuro-Psychological Decoding",
      powerLevel: 98,
      icon: Eye,
      accent: "text-myth-red-bright",
      border: "border-myth-red-bright/50",
      glow: "shadow-[0_0_30px_rgba(255,31,45,0.25)]",
      description:
        "The ability to dismantle emotional decoys, aggressive masks, and social defenses in real time. Where others perceive anger, hostility, or defeat, The Myth identifies the hidden wound or structural dilemma fueling the behavior.",
      mechanics: [
        "Real-time micro-expression and pulse desynchronization analysis.",
        "Dismantles panic barriers without violent confrontation.",
        "Pinpoints systemic and interpersonal breaking points before they collapse.",
      ],
      quote:
        "Anger is almost always fear in disguise. When you address the fear, the anger dissolves.",
    },
    {
      id: "03",
      code: "PROTOCOL-SIGNAL",
      name: "THE EMOTIONAL SIGNAL FIELD",
      tagline: "A biological frequency that awakens in response to human pain.",
      category: "BIO-ENERGY CONDUIT",
      energyType: "Luminescent Cyan Bio-Radiation",
      powerLevel: 96,
      icon: Zap,
      accent: "text-myth-cyan-glow",
      border: "border-myth-cyan-glow/50",
      glow: "shadow-[0_0_30px_rgba(54,245,255,0.3)]",
      description:
        "Awakened during the subterranean medical experiments, his body channels a strange bio-energy field that manifests through his luminescent cyan hair. This energy stabilizes emotional chaos and provides ambient tactical awareness.",
      mechanics: [
        "Radiant cyan hair conduits that illuminate when synchronized with distress.",
        "Bio-electric calming aura that mitigates acute panic in nearby survivors.",
        "Forms an encrypted quantum bridge between visitor transmitters and The Myth.",
      ],
      quote:
        "They injected compounds to make a weapon. The energy chose instead to tune into the hearts of the desperate.",
    },
    {
      id: "04",
      code: "PROTOCOL-KINETIC",
      name: "SUPERHUMAN REFLEXES & KINETIC AGILITY",
      tagline: "Instantaneous anticipation forged on the pitch, amplified by science.",
      category: "PHYSICAL ENHANCEMENT",
      energyType: "Cellular Hyper-Acceleration",
      powerLevel: 95,
      icon: Flame,
      accent: "text-myth-red-crimson",
      border: "border-myth-red-bright/50",
      glow: "shadow-[0_0_30px_rgba(229,9,32,0.3)]",
      description:
        "Born from his elite athletic foundation as a professional footballer and multiplied tenfold by cellular regeneration compounds, his reflexes operate at near-instantaneous speed, allowing him to intercept threats before they strike.",
      mechanics: [
        "Sub-millisecond kinetic anticipation and field awareness.",
        "Superhuman agility, parkour fluidity, and silent shadow traversal.",
        "Rapid physiological recovery from blunt force impacts.",
      ],
      quote:
        "Movement creates change. When an athlete’s discipline meets an unbreakable will, physics takes second place.",
    },
    {
      id: "05",
      code: "PROTOCOL-ARCHIVE",
      name: "THE QUANTUM ARCHIVE MATRIX",
      tagline: "Every story becomes part of something greater.",
      category: "SYSTEMIC MEMORY",
      energyType: "Distributed Empathic Ledger",
      powerLevel: 97,
      icon: Archive,
      accent: "text-white",
      border: "border-charcoal-500",
      glow: "shadow-[0_0_30px_rgba(255,255,255,0.15)]",
      description:
        "A quantum memory index that cross-references patterns of human struggle across the globe. No grievance is treated as an isolated incident — every shared voice is archived to build structural solutions.",
      mechanics: [
        "256-bit quantum encrypted transmission archival.",
        "Zero data degradation — every transmission remains permanently recorded.",
        "Cross-analyzes recurring societal dilemmas to trigger targeted community relief.",
      ],
      quote:
        "A forgotten voice is a repeat catastrophe. The Archive ensures no cry for help ever fades.",
    },
    {
      id: "06",
      code: "PROTOCOL-RESPONSE",
      name: "THE SUMMONING BEACON & INTERVENTION",
      tagline: "When someone reaches out, The Myth answers.",
      category: "DIRECT MOBILIZATION",
      energyType: "High-Priority Emergency Relay",
      powerLevel: 99,
      icon: Shield,
      accent: "text-myth-cyan",
      border: "border-myth-cyan/60",
      glow: "shadow-[0_0_30px_rgba(0,217,255,0.3)]",
      description:
        "The direct mobilization of emergency intervention, automated notification relays, and targeted strategic guidance. Once summoned through the Resonance Network, the connection is immediate and unbreakable.",
      mechanics: [
        "Instant dual notification dispatch via encrypted SMTP channels.",
        "Continuous natural conversation without session termination.",
        "Unconditional confidentiality for every visitor.",
      ],
      quote:
        "He doesn't promise to fix every problem. He doesn't claim every answer. He simply listens — and stands with you.",
    },
  ];

  const current = abilities[selectedAbility];
  const CurrentIcon = current.icon;

  return (
    <main className="min-h-screen bg-charcoal-950 text-text-primary selection:bg-myth-red selection:text-white relative">
      {/* Navigation */}
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-charcoal-800 overflow-hidden tech-grid-bg">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-myth-cyan/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-myth-red/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-6 text-left">
          {/* Back to Base Link */}
          <Link
            href="/"
            onClick={() => soundManager.playKeypress()}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-text-muted hover:text-myth-cyan uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            RETURN TO COMMAND CENTER
          </Link>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-charcoal-900 border border-myth-cyan/40 text-[11px] font-mono text-myth-cyan tracking-widest uppercase shadow-sm">
              <Activity className="w-3.5 h-3.5 text-myth-cyan animate-pulse" />
              CAPABILITIES & RESONANCE MATRIX // DECLASSIFIED
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-none">
              POWERS BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-myth-cyan via-white to-myth-red-bright">
                PHYSICAL FORCE
              </span>
            </h1>

            <p className="text-sm sm:text-base text-text-muted font-sans max-w-2xl leading-relaxed pt-2">
              The Myth does not rely on weapons or brute destruction. His power lies in an extraordinary synergy of athletic physical conditioning, neurological energy resonance, and an unshakeable capacity for radical empathy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Matrix */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Ability Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase px-1 mb-2 flex items-center justify-between">
              <span>SELECT DISCIPLINE</span>
              <span className="text-myth-cyan font-semibold">6 ARCHIVED</span>
            </div>

            {abilities.map((ab, idx) => {
              const Icon = ab.icon;
              const isSelected = selectedAbility === idx;
              return (
                <button
                  key={ab.id}
                  onClick={() => {
                    soundManager.playKeypress();
                    setSelectedAbility(idx);
                  }}
                  className={`w-full p-4 rounded-lg border text-left transition-all duration-200 flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-charcoal-900 border-myth-cyan shadow-[0_0_20px_rgba(0,217,255,0.25)] scale-[1.02]"
                      : "bg-charcoal-900/40 border-charcoal-800 hover:border-charcoal-700 hover:bg-charcoal-900/80 text-text-muted"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded border flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "border-myth-cyan bg-charcoal-950 text-myth-cyan"
                          : "border-charcoal-700 bg-charcoal-900 text-text-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-myth-cyan tracking-wider">
                          {ab.id}
                        </span>
                        <span className="text-[10px] font-mono text-text-muted uppercase">
                          {ab.category}
                        </span>
                      </div>
                      <div className={`font-display font-black text-sm uppercase tracking-wide ${isSelected ? "text-white" : "text-text-primary"}`}>
                        {ab.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className={`text-xs font-mono font-bold ${isSelected ? "text-myth-cyan" : "text-text-muted"}`}>
                      {ab.powerLevel}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Dossier Showcase Card */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-10 rounded-xl bg-charcoal-900/90 border ${current.border} ${current.glow} relative overflow-hidden backdrop-blur-md space-y-6 text-left`}>
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-myth-cyan tracking-widest uppercase">
                    <CurrentIcon className="w-4 h-4 text-myth-cyan animate-pulse" />
                    <span>{current.code}</span>
                    <span className="text-charcoal-600">&bull;</span>
                    <span className="text-myth-red-bright">{current.category}</span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
                    {current.name}
                  </h2>

                  <p className="font-mono text-xs sm:text-sm text-myth-red-bright font-semibold">
                    &ldquo;{current.tagline}&rdquo;
                  </p>
                </div>

                {/* Level Gauge */}
                <div className="bg-charcoal-950 border border-charcoal-700 p-3 rounded text-center flex-shrink-0">
                  <div className="text-[10px] font-mono text-text-muted uppercase">SYNAPSE LOCK</div>
                  <div className="text-xl font-mono font-black text-myth-cyan">{current.powerLevel}%</div>
                </div>
              </div>

              {/* Energy Type Tag */}
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <span className="text-text-muted/60 uppercase">Energy Classification:</span>
                <span className="text-white font-bold">{current.energyType}</span>
              </div>

              {/* Full Description */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase">
                  OPERATIONAL OVERVIEW
                </h3>
                <p className="text-sm sm:text-base text-text-primary/90 font-sans leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Key Mechanics */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase">
                  TACTICAL MECHANICS & APPLICATIONS
                </h3>
                <div className="space-y-2">
                  {current.mechanics.map((mech, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded bg-charcoal-950/80 border border-charcoal-800 text-xs sm:text-sm text-text-muted flex items-start gap-2.5 font-sans"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-myth-cyan mt-1.5 flex-shrink-0" />
                      <span>{mech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Philosophical Quote */}
              <div className="pt-4 border-t border-charcoal-800">
                <blockquote className="text-xs sm:text-sm font-sans italic text-text-muted border-l-2 border-myth-red-bright pl-3.5 py-1">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              </div>

              {/* Terminal Action Trigger */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-text-muted flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-myth-cyan" />
                  <span>ALL CAPABILITIES ARCHIVED & MONITORED</span>
                </div>

                <Link
                  href="/#summon"
                  onClick={() => soundManager.playTransmissionSend()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-myth-red hover:bg-myth-red-bright text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(193,18,31,0.5)] active:scale-95"
                >
                  <span>SUMMON THE MYTH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
