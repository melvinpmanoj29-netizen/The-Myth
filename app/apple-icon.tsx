import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080A",
          borderRadius: "36px",
          border: "4px solid #FF2635",
        }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Center Top Needle / Trident Lance */}
          <path
            d="M50 6 L53.5 46 L50 60 L46.5 46 Z"
            fill="#FFFFFF"
          />

          {/* Left Tactical Wing Blade */}
          <path
            d="M26 22 L16 54 L36 92 L42 90 L24 55 L32 25 Z"
            fill="#E2E8F0"
          />

          {/* Right Tactical Wing Blade */}
          <path
            d="M74 22 L84 54 L64 92 L58 90 L76 55 L68 25 Z"
            fill="#E2E8F0"
          />

          {/* Center Crimson Red V-Chevron Core Vector */}
          <path
            d="M34 46 L50 72 L66 46 L59 42 L50 57 L41 42 Z"
            fill="#FF2635"
          />

          {/* Bottom Center Point */}
          <path
            d="M48 76 L50 82 L52 76 Z"
            fill="#FF2635"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
