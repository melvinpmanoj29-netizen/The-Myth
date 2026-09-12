"use client";

import React, { useState } from "react";
import { Activity, Radio, FlaskConical, ShieldAlert, Sparkles, HeartPulse, Trophy, ArrowRight } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function OriginSection() {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      num: "01",
      tag: "THE PLAYER",
      title: "BEFORE THE MYTH",
      subtitle: "A life on the pitch",
      icon: Trophy,
      content: [
        "Before the Myth, there was only a player.",
        "Before the legends, before the signal, before people began calling him The Myth, he was simply a young footballer.",
        "He lived for the game. The stadium was his world. The roar of the crowd was his energy. Every match was another chance to push himself beyond his limits.",
        "Until one match changed everything. A violent collision left him with a life-threatening injury. His career was over. Or at least, that was what everyone believed.",
      ],
      highlight: "A career destroyed in a single second. The beginning of the fracture.",
      accent: "text-myth-cyan",
      border: "border-myth-cyan/40",
    },
    {
      num: "02",
      tag: "THE SPECIALIST",
      title: "THE DOCTOR",
      subtitle: "A sinister ambition beneath a spotless reputation",
      icon: FlaskConical,
      content: [
        "He was taken to one of the city's most respected specialists.",
        "To the world, the doctor was a brilliant humanitarian — a man who had dedicated his life to saving people who had nowhere else to turn.",
        "But behind the spotless reputation was another man. A scientist obsessed with one question: How far can the human body be pushed before it becomes something more?",
        "His private laboratory was hidden beneath his medical facility. There, he conducted experiments that could never be approved by science, medicine, or humanity. And the injured footballer became his newest subject.",
      ],
      highlight: "The promise of treatment led down into the dark.",
      accent: "text-myth-red-bright",
      border: "border-myth-red/40",
    },
    {
      num: "03",
      tag: "THE CATALYST",
      title: "THE EXPERIMENT",
      subtitle: "Cellular rewriting and the birth of The Signal",
      icon: HeartPulse,
      content: [
        "The doctor promised him treatment. Instead, he took him underground.",
        "The player was subjected to experimental compounds designed to accelerate cellular regeneration. His body was then exposed to controlled radioactive energy and experimental biological frequencies.",
        "The treatment should have killed him. His heart stopped. His body began to shut down. For several minutes, there was nothing. Then— his heart beat again.",
        "The chemicals had rewritten his body's limits. His muscles became extraordinarily powerful. His reflexes became almost instantaneous. And something else emerged: The Signal — a strange energy that responded to human emotion, pain, fear, and desperation.",
      ],
      highlight: "The doctor wanted a controllable weapon. He created something uncontrollable.",
      accent: "text-myth-cyan-bright",
      border: "border-myth-cyan/50",
    },
    {
      num: "04",
      tag: "THE REBIRTH",
      title: "THE ESCAPE",
      subtitle: "Breaking containment and finding purpose in suffering",
      icon: ShieldAlert,
      content: [
        "When the doctor realized what he had created, he tried to contain him. But the player fought back.",
        "He escaped the laboratory — leaving behind the only life he had ever known. The footballer the world knew was gone. The Myth had been born.",
        "His greatest power wasn't his strength, his speed, or the energy flowing through his body.",
        "It was what the experiment had taught him about suffering. He knew what it felt like to be helpless. He knew what it meant to have nobody listen. And he refused to let anyone else feel the same way.",
      ],
      highlight: "The scars became the compass. The suffering became the conviction.",
      accent: "text-myth-red-crimson",
      border: "border-myth-red-bright/50",
    },
    {
      num: "05",
      tag: "THE VIGIL",
      title: "THE MYTH",
      subtitle: "The one who listens when others don't",
      icon: Radio,
      content: [
        "He disappeared from the world. Then the stories began.",
        "A stranger appearing when someone had nowhere else to turn. A figure moving through the shadows. A voice answering signals that nobody else could hear.",
        "People started calling him The Myth. Not because nobody knew whether he was real, but because nobody could explain how he always seemed to find the people who needed help.",
        "He doesn't promise to fix every problem. He doesn't claim to have every answer. He simply listens. And when someone reaches out — The Myth answers.",
      ],
      highlight: "Listen. Understand. Stand. Protect. Empower.",
      accent: "text-white",
      border: "border-myth-cyan/60",
    },
  ];

  return (
    <section
      id="origin"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-950 border-t border-charcoal-800 overflow-hidden tech-grid-bg"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-myth-red/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-myth-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-myth-red-bright uppercase">
            <span className="w-8 h-[1px] bg-myth-red-bright" />
            ORIGIN ARCHIVE // DECLASSIFIED
            <span className="w-8 h-[1px] bg-myth-red-bright" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
            THE BIRTH OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-myth-red-bright to-myth-cyan">THE MYTH</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Before the legends, there was only an athlete fighting for his life. The true story of how trauma and resonance created the world&apos;s foremost listener.
          </p>
        </div>

        {/* Chapter Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {chapters.map((ch, idx) => {
            const Icon = ch.icon;
            const isActive = activeChapter === idx;
            return (
              <button
                key={ch.num}
                onClick={() => {
                  soundManager.playKeypress();
                  setActiveChapter(idx);
                }}
                className={`p-3.5 rounded border text-left transition-all duration-200 flex flex-col justify-between gap-2 ${
                  isActive
                    ? "bg-charcoal-900 border-myth-red-bright shadow-[0_0_20px_rgba(193,18,31,0.3)] text-white"
                    : "bg-charcoal-900/40 border-charcoal-700/80 text-text-muted hover:border-charcoal-600 hover:text-text-primary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-myth-cyan">
                    {ch.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-myth-red-bright" : "text-text-muted"}`} />
                </div>
                <div className="font-mono text-[11px] font-bold tracking-wider uppercase truncate">
                  {ch.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Showcase Box */}
        <div className="p-6 sm:p-10 rounded-xl bg-charcoal-900/90 border border-charcoal-700/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-charcoal-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-myth-cyan tracking-widest uppercase mb-1">
                <span>CHAPTER {chapters[activeChapter].num}</span>
                <span className="text-charcoal-600">&bull;</span>
                <span className="text-myth-red-bright">{chapters[activeChapter].tag}</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {chapters[activeChapter].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-text-muted">
                {chapters[activeChapter].subtitle}
              </p>
            </div>

            <div className="px-4 py-2 rounded bg-charcoal-950 border border-charcoal-700 text-xs font-mono text-myth-cyan flex items-center gap-2 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-myth-cyan animate-pulse" />
              <span>RECORD ARCHIVED</span>
            </div>
          </div>

          {/* Chapter Paragraphs */}
          <div className="py-6 space-y-4 text-sm sm:text-base text-text-muted font-sans leading-relaxed">
            {chapters[activeChapter].content.map((p, pIdx) => (
              <p key={pIdx} className="text-text-primary/90">
                {p}
              </p>
            ))}
          </div>

          {/* Key Insight Highlight */}
          <div className="mt-4 p-4 rounded-lg bg-charcoal-950/80 border-l-2 border-myth-red-bright flex items-center justify-between">
            <span className="font-mono text-xs sm:text-sm text-myth-red-bright font-semibold">
              &ldquo;{chapters[activeChapter].highlight}&rdquo;
            </span>
            <span className="text-[10px] font-mono text-text-muted uppercase hidden sm:inline">
              DECLASSIFIED
            </span>
          </div>
        </div>

        {/* The Myth's Core Philosophy Banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-xl bg-gradient-to-r from-charcoal-900 via-charcoal-900/90 to-charcoal-950 border border-myth-red/50 shadow-[0_0_30px_rgba(193,18,31,0.2)] text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="text-[11px] font-mono tracking-[0.25em] text-myth-cyan uppercase">
              HIS PHILOSOPHY
            </div>
            <blockquote className="font-display font-black text-lg sm:text-2xl text-white leading-snug">
              &ldquo;They tried to turn me into a weapon.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-myth-red-bright via-white to-myth-cyan">
                They forgot that the strongest thing inside a human being isn&apos;t power. It&apos;s the will to keep going.&rdquo;
              </span>
            </blockquote>
            <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono text-text-muted uppercase tracking-widest">
              <span>LISTEN</span>
              <span>&bull;</span>
              <span>UNDERSTAND</span>
              <span>&bull;</span>
              <span>STAND</span>
              <span>&bull;</span>
              <span>PROTECT</span>
              <span>&bull;</span>
              <span className="text-myth-cyan font-bold">EMPOWER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
