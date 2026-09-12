"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Emblem } from "@/components/ui/Emblem";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { Menu, X, Zap } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "THE MYTH", href: "/#who-is-myth" },
    { name: "ORIGIN", href: "/#origin" },
    { name: "ABILITIES", href: "/abilities" },
    { name: "MISSION", href: "/#mission" },
    { name: "STORIES", href: "/#values" },
  ];

  const handleLinkClick = () => {
    soundManager.playKeypress();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal-950/95 backdrop-blur-md border-b border-charcoal-700/80 shadow-[0_4px_30px_rgba(0,0,0,0.85)] py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: THE MYTH & RESONANCE NETWORK with Emblem */}
          <Link
            href="/"
            onClick={() => soundManager.playKeypress()}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative">
              <Emblem size={32} className="transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-widest text-base sm:text-lg text-text-primary leading-tight">
                THE MYTH
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-text-muted uppercase">
                RESONANCE NETWORK
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-xs font-mono font-medium tracking-widest text-text-muted hover:text-white transition-colors duration-200 uppercase relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-myth-red-bright transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Status Badges & CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Status Indicator Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-myth-cyan/40 bg-charcoal-900/90 text-myth-cyan text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(0,217,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-myth-cyan animate-pulse" />
              <span>SIGNAL: ACTIVE</span>
            </div>

            {/* Signal Waveform Graphic */}
            <div className="hidden md:flex items-center gap-[2px] h-4 px-2 py-1 bg-charcoal-900/60 rounded border border-charcoal-700">
              <span className="w-[2px] h-2 bg-myth-cyan/60 animate-pulse" style={{ animationDelay: "0ms" }} />
              <span className="w-[2px] h-3.5 bg-myth-cyan animate-pulse" style={{ animationDelay: "150ms" }} />
              <span className="w-[2px] h-1.5 bg-myth-cyan/50 animate-pulse" style={{ animationDelay: "300ms" }} />
              <span className="w-[2px] h-4 bg-myth-cyan-glow animate-pulse" style={{ animationDelay: "450ms" }} />
              <span className="w-[2px] h-2.5 bg-myth-cyan animate-pulse" style={{ animationDelay: "200ms" }} />
              <span className="w-[2px] h-1.5 bg-myth-cyan/50 animate-pulse" style={{ animationDelay: "100ms" }} />
            </div>

            <AudioToggle />

            {/* Summon Button */}
            <a
              href="#summon"
              onClick={() => {
                soundManager.playTransmissionSend();
              }}
              className="relative inline-flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold tracking-wider uppercase text-white bg-myth-red hover:bg-myth-red-bright rounded border border-myth-red-bright/60 transition-all duration-200 shadow-[0_0_18px_rgba(193,18,31,0.5)] hover:shadow-[0_0_28px_rgba(255,31,45,0.8)] active:scale-95 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
              SUMMON
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <AudioToggle />
            <button
              onClick={() => {
                soundManager.playKeypress();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded border border-charcoal-700 bg-charcoal-850 text-text-primary hover:text-myth-cyan active:scale-95 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[60px] bg-black/70 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-40 lg:hidden bg-charcoal-950/98 backdrop-blur-xl border-b border-charcoal-700 px-5 sm:px-6 py-5 space-y-4 max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in slide-in-from-top duration-200">
            <div className="pb-3 border-b border-charcoal-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-myth-cyan">
                <span className="w-2 h-2 rounded-full bg-myth-cyan animate-pulse" />
                SIGNAL: ACTIVE (MYTH-01)
              </div>
              <span className="text-[10px] font-mono text-text-muted uppercase">FREQUENCY SECURE</span>
            </div>
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-sm font-mono tracking-widest text-text-muted hover:text-white py-3 uppercase border-b border-charcoal-850 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-charcoal-600 text-xs">→</span>
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <a
                href="#summon"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white bg-myth-red hover:bg-myth-red-bright rounded border border-myth-red-bright/50 shadow-[0_0_20px_rgba(193,18,31,0.5)] active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-white fill-white" />
                SUMMON THE MYTH
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
