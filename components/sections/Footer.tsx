"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Emblem } from "@/components/ui/Emblem";
import { soundManager } from "@/lib/sound";

export function Footer() {
  const footerLinks = [
    { name: "People", href: "#who-is-myth" },
    { name: "Origin", href: "#origin" },
    { name: "Stories", href: "#values" },
    { name: "Abilities", href: "#abilities" },
    { name: "Mission", href: "#mission" },
  ];

  return (
    <footer className="relative bg-charcoal-950 border-t border-charcoal-800 overflow-hidden">
      {/* Background Graphic using myth_footer.png with uncropped top */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/8] min-h-[260px] sm:min-h-[380px] md:min-h-[440px] overflow-hidden border-b border-charcoal-800/80">
        <Image
          src="/images/myth_footer.png"
          alt="The Myth Resonance Network Footer Scene"
          fill
          sizes="100vw"
          className="object-cover object-top opacity-75 filter brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/70 via-transparent to-charcoal-950/70" />

        {/* Center Overlay Tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-12 text-center p-4 z-10 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-900/90 border border-charcoal-700 text-[10px] sm:text-[11px] font-mono text-myth-cyan tracking-widest uppercase shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-myth-cyan animate-pulse" />
            RESONANCE NETWORK // ONLINE
          </div>
          <p className="font-display font-black text-base sm:text-2xl md:text-3xl uppercase tracking-tight text-white max-w-xl leading-snug drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
            &ldquo;They tried to turn me into a weapon.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-myth-red-bright via-white to-myth-cyan">
              The strongest thing inside a human is the will to keep going.&rdquo;
            </span>
          </p>
        </div>
      </div>

      {/* Main Footer Bottom Bar */}
      <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <Emblem size={28} />
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-sm text-text-primary tracking-widest uppercase">
              THE MYTH
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-text-muted uppercase">
              RESONANCE NETWORK
            </span>
          </div>
        </div>

        {/* Center Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => soundManager.playKeypress()}
              className="text-xs font-mono tracking-wider text-text-muted hover:text-white transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Tagline */}
        <div className="flex items-center justify-center md:justify-end gap-2 text-center md:text-right">
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-text-muted uppercase">
            A KINDER WORLD IS STILL POSSIBLE.
          </span>
          <span className="w-4 h-[2px] bg-myth-red-bright inline-block flex-shrink-0" />
        </div>
      </div>
    </footer>
  );
}
