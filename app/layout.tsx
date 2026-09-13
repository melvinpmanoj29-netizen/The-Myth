import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://themyth.network"),
  title: "The Myth — Someone Is Listening",
  description: "Summon The Myth. Tell your story. Be heard.",
  keywords: [
    "The Myth",
    "Superhero Help Portal",
    "Hero Portal",
    "Grievance",
    "Conversational AI",
    "Emergency Support",
    "Superhero Network",
  ],
  authors: [{ name: "The Myth Response Network" }],
  creator: "The Myth",
  publisher: "The Myth Help Portal",
  openGraph: {
    title: "The Myth — Someone Is Listening",
    description: "Summon The Myth. Tell your story. Be heard.",
    url: "https://themyth.network",
    siteName: "The Myth Portal",
    images: [
      {
        url: "/images/myth_hero.png",
        width: 1654,
        height: 951,
        alt: "The Myth — The One Who Listens",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Myth — Someone Is Listening",
    description: "Summon The Myth. Tell your story. Be heard.",
    images: ["/images/myth_hero.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-text-primary antialiased min-h-screen relative selection:bg-myth-red selection:text-white">
        {/* Subtle Global Scanline Overlay */}
        <div className="fixed inset-0 hud-scanline pointer-events-none z-50 opacity-25" />
        {children}
      </body>
    </html>
  );
}
