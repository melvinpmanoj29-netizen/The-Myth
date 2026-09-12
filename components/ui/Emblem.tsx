import React from "react";

interface EmblemProps {
  className?: string;
  size?: number;
}

export function Emblem({ className = "", size = 36 }: EmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="mythRedGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2635" />
          <stop offset="0.6" stopColor="#FF1F2D" />
          <stop offset="1" stopColor="#C1121F" />
        </linearGradient>
        <linearGradient id="mythBladeGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.7" stopColor="#E2E8F0" />
          <stop offset="1" stopColor="#94A3B8" />
        </linearGradient>
        <filter id="mythRedGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Center Top Needle / Trident Lance */}
      <path
        d="M50 6 L53.5 46 L50 60 L46.5 46 Z"
        fill="url(#mythBladeGrad)"
      />

      {/* Left Tactical Wing Blade */}
      <path
        d="M26 22 L16 54 L36 92 L42 90 L24 55 L32 25 Z"
        fill="url(#mythBladeGrad)"
      />

      {/* Right Tactical Wing Blade */}
      <path
        d="M74 22 L84 54 L64 92 L58 90 L76 55 L68 25 Z"
        fill="url(#mythBladeGrad)"
      />

      {/* Center Crimson Red V-Chevron Core Vector */}
      <path
        d="M34 46 L50 72 L66 46 L59 42 L50 57 L41 42 Z"
        fill="url(#mythRedGrad)"
        filter="url(#mythRedGlow)"
      />

      {/* Bottom Center Point */}
      <path
        d="M48 76 L50 82 L52 76 Z"
        fill="url(#mythRedGrad)"
      />
    </svg>
  );
}

