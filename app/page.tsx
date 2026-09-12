import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { SummoningSection } from "@/components/chatbot/SummoningSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { WhoIsTheMyth } from "@/components/sections/WhoIsTheMyth";
import { OriginSection } from "@/components/sections/OriginSection";
import { AbilitiesSection } from "@/components/sections/AbilitiesSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal-950 text-text-primary selection:bg-myth-red selection:text-white relative">
      {/* 00: Fixed Top HUD Navigation */}
      <Navbar />

      {/* 01: Hero Section */}
      <HeroSection />

      {/* 02: Myth Signal Terminal (Interactive Conversational Interface) */}
      <SummoningSection />

      {/* 03: Feature / Values Section (3 Pillars: Be Heard, Be Understood, A Brighter Tomorrow) */}
      <ValuesSection />

      {/* 04: Story & Mission Section (A Stronger Tomorrow) */}
      <MissionSection />

      {/* 05: Identity Dossier */}
      <WhoIsTheMyth />

      {/* 06: Origin Lore */}
      <OriginSection />

      {/* 07: Capabilities */}
      <AbilitiesSection />

      {/* 08: Minimal Dark Footer */}
      <Footer />
    </main>
  );
}
