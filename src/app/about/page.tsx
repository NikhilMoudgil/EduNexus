import type { Metadata } from "next";
import {
  AboutHero, MissionSection, PillarsSection, FounderSection,
  EcosystemShowcase, JourneyTimeline, ImpactStats, FinalCTA,
} from "@/components/about/sections";

export const metadata: Metadata = {
  title: "About | EduNexus",
  description: "EduNexus is an engineering-first platform that turns technical learning into measurable career readiness, built by Nikhil Moudgil.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050f] text-white">
      <style>{`
        @keyframes en-spin { to { transform: rotateX(68deg) rotateZ(360deg); } }
        @keyframes en-float { 0%,100% { transform: translate(-50%,-50%) rotate(45deg) } 50% { transform: translate(-50%,-56%) rotate(225deg) } }
        .en-ring { transform: rotateX(68deg) rotateZ(0); animation: en-spin 24s linear infinite; }
        .en-core { animation: en-float 14s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .en-ring, .en-core { animation: none !important; }
          * { transition-duration: .01ms !important; }
        }
      `}</style>
      {/* Blueprint grid + ambient glow (static, no JS) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.07]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(#000,transparent 60%)" }} />
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-fuchsia-900/20 blur-[160px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-cyan-900/20 blur-[160px]" />

      <AboutHero />
      <MissionSection />
      <PillarsSection />
      <FounderSection />
      <EcosystemShowcase />
      <JourneyTimeline />
      <ImpactStats />
      <FinalCTA />
    </main>
  );
}
