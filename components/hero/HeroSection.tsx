"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AtmosphereCanvas } from "./AtmosphereCanvas";
import { ArrowRight, Play, Radio, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSummonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    soundManager.playTransmissionSend();
    const summonElement = document.getElementById("summon");
    if (summonElement) {
      summonElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWatchSignalClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    soundManager.playKeypress();
    const missionElement = document.getElementById("mission");
    if (missionElement) {
      missionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal-950 pt-24 sm:pt-28 pb-12 sm:pb-16">
      
      {/* 1. FULL BACKGROUND IMAGE: myth_hero.png spanning the entire hero section */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/myth_hero.png"
            alt="The Myth Hero Full Cinematic Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] sm:object-[center_right] lg:object-right filter brightness-105 contrast-102"
          />

          {/* Left-to-Right and Bottom Scrim Gradients for text legibility while keeping the hero bright and vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/80 sm:via-charcoal-950/50 to-charcoal-950/30 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
        </motion.div>
      </div>

      {/* 2. DYNAMIC SPECIAL EFFECTS: Ambient Canvas, Cyan/Red Glow Orbs, & Tech Grid */}
      <AtmosphereCanvas />

      {/* Atmospheric Radial Glow Pulsing Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-myth-red/15 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-myth-cyan/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Subtle Tech Corner HUD Frame */}
      <div className="absolute top-24 left-6 hidden xl:block text-[10px] font-mono text-text-muted/60 tracking-widest uppercase pointer-events-none">
        <span className="text-myth-cyan font-bold">RESONANCE FREQUENCY:</span> ACTIVE
        <br />
        <span className="text-myth-red-bright font-bold">SECTOR:</span> 00-M // LISTENING
      </div>

      {/* 3. OVERLAPPING CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-140px)]">
          
          {/* Left Side: Overlapping Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-left space-y-5 sm:space-y-6 pt-4 sm:pt-6 lg:pt-0"
          >
            {/* Eyebrow */}
            <div className="text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] text-text-muted uppercase flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span>PEOPLE</span>
              <span className="text-charcoal-500">/</span>
              <span>STORIES</span>
              <span className="text-charcoal-500">/</span>
              <span>STRUGGLES</span>
              <span className="text-charcoal-500">/</span>
              <span className="text-myth-cyan font-semibold">A STRONGER TOMORROW</span>
            </div>

            {/* Huge Headline: THE MYTH with Red Y */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-[0.88] uppercase select-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
                THE
                <br />
                <span className="tracking-tight">
                  M<span className="text-myth-red-bright text-glow-red inline-block transform hover:scale-105 transition-transform">Y</span>TH
                </span>
              </h1>
            </div>

            {/* Subtitle Under Title */}
            <div className="space-y-2.5 sm:space-y-3">
              <h2 className="font-mono font-bold text-xs sm:text-base md:text-lg tracking-[0.14em] sm:tracking-[0.18em] text-white uppercase leading-snug drop-shadow-md">
                THE ONE WHO LISTENS
                <br />
                WHEN OTHERS DON&apos;T.
              </h2>

              <p className="text-xs sm:text-base text-text-muted font-sans font-normal max-w-lg leading-relaxed drop-shadow">
                A safe place to be heard.
                <br className="hidden sm:inline" />
                Share what weighs on you, and let your voice reach someone who cares.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="#summon"
                onClick={handleSummonClick}
                className="relative group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white bg-myth-red hover:bg-myth-red-bright rounded border border-myth-red-bright/70 shadow-[0_0_25px_rgba(193,18,31,0.65)] hover:shadow-[0_0_45px_rgba(255,31,45,0.95)] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>SUMMON THE MYTH</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#mission"
                onClick={handleWatchSignalClick}
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase text-text-primary hover:text-myth-cyan bg-charcoal-950/80 hover:bg-charcoal-900 rounded border border-charcoal-700 hover:border-myth-cyan/60 transition-all duration-200 cursor-pointer backdrop-blur-sm shadow-md active:scale-95"
              >
                <div className="w-4 h-4 rounded-full border border-myth-cyan/80 flex items-center justify-center">
                  <Play className="w-2 h-2 text-myth-cyan fill-myth-cyan ml-[1px]" />
                </div>
                <span>WATCH SIGNAL</span>
              </a>
            </div>

            {/* Three Compact Statements */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 sm:pt-6 border-t border-charcoal-700/60 max-w-lg">
              <div className="border-l-2 border-myth-red pl-2.5 sm:pl-3 space-y-0.5">
                <div className="text-[11px] sm:text-sm font-mono font-black text-white tracking-wider uppercase truncate">
                  REAL PEOPLE
                </div>
                <div className="text-[9px] sm:text-xs font-mono text-text-muted uppercase truncate">
                  YOU SPEAK
                </div>
              </div>

              <div className="border-l-2 border-charcoal-600 pl-2.5 sm:pl-3 space-y-0.5">
                <div className="text-[11px] sm:text-sm font-mono font-black text-white tracking-wider uppercase truncate">
                  REAL STORIES
                </div>
                <div className="text-[9px] sm:text-xs font-mono text-text-muted uppercase truncate">
                  HE LISTENS
                </div>
              </div>

              <div className="border-l-2 border-myth-cyan pl-2.5 sm:pl-3 space-y-0.5">
                <div className="text-[11px] sm:text-sm font-mono font-black text-white tracking-wider uppercase truncate">
                  REAL CHANGE
                </div>
                <div className="text-[9px] sm:text-xs font-mono text-text-muted uppercase truncate">
                  A BRIGHTER TOMORROW
                </div>
              </div>
            </div>

            {/* Mobile-Only Still Listening Subtitle */}
            <div className="block sm:hidden pt-1">
              <span className="font-display italic font-black text-2xl text-myth-red-bright tracking-wide text-glow-red opacity-90">
                Still Listening...
              </span>
            </div>
          </motion.div>

          {/* Right Side: Overlapping Side Tags & "Still Listening..." Script directly on the Hero Canvas */}
          <div className="lg:col-span-5 relative hidden sm:flex flex-col items-end justify-between h-[520px] pointer-events-none select-none">
            
            {/* Top Right Vertical Badge */}
            <div className="flex flex-col items-end text-right space-y-1 bg-charcoal-950/70 backdrop-blur-md p-3.5 rounded border border-charcoal-700/60 shadow-lg mt-8">
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">SAME</span>
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">SKIES</span>
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">DIFFERENT</span>
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">STORIES</span>
              <span className="text-[10px] font-mono tracking-widest text-myth-cyan font-bold uppercase">YOU ARE</span>
              <span className="text-[10px] font-mono tracking-widest text-myth-cyan font-bold uppercase">NOT ALONE</span>
              <div className="w-8 h-[2px] bg-myth-red-bright mt-1" />
            </div>

            {/* Bottom Right Glowing "Still Listening..." Script */}
            <div className="transform -rotate-6 mb-4 mr-2">
              <span className="font-display italic font-black text-3xl sm:text-4xl md:text-5xl text-myth-red-bright tracking-wide text-glow-red opacity-95 drop-shadow-[0_4px_20px_rgba(255,31,45,0.85)]">
                Still Listening...
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
