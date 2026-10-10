"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, LayoutDashboard } from "lucide-react";

const TABS = [
  { href: "/tracker", label: "My tracker", icon: LayoutDashboard, match: (p: string) => p === "/tracker" },
  { href: "/tracker/explore", label: "Explore", icon: Compass, match: (p: string) => p.startsWith("/tracker/explore") },
];

export default function TrackerTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Placement tracker sections"
      className="inline-flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
    >
      {TABS.map(({ href, label, icon: Icon, match }) => {
        const active = match(pathname);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              active
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
