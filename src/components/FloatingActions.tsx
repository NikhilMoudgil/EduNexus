"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The two floating shortcuts that used to live in layout.tsx.
// - On phones they shrink to icon-only circles so they stop overlapping each other and the page content.
// - Each one hides itself on the section it points to.
// - z-40 keeps them under the navbar (z-50) and under modals.
export default function FloatingActions() {
  const pathname = usePathname();
  const inTracker = pathname.startsWith("/tracker");
  const inArena = pathname.startsWith("/arena");

  return (
    <>
      {!inArena && (
        <Link
          href="/arena"
          aria-label="Dev Arena"
          className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-40 group"
        >
          <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white p-3.5 sm:px-6 sm:py-4 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_40px_rgba(217,70,239,0.7)] hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none border border-fuchsia-400/50">
            <i className="fas fa-gamepad text-lg motion-safe:animate-pulse group-hover:animate-none" aria-hidden></i>
            <span className="hidden sm:inline font-bold tracking-wide">Dev Arena</span>
          </div>
        </Link>
      )}

      {!inTracker && (
        <Link
          href="/tracker"
          aria-label="Placement Tracker"
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 group"
        >
          <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3.5 sm:px-6 sm:py-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none border border-green-400/50">
            <i className="fas fa-briefcase text-lg motion-safe:animate-pulse group-hover:animate-none" aria-hidden></i>
            <span className="hidden sm:inline font-bold tracking-wide">Placement Tracker</span>
          </div>
        </Link>
      )}
    </>
  );
}
