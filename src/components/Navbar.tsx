"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Start Here" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/community", label: "Community" },
  { href: "/tracker", label: "Tracker" },
  { href: "/about", label: "About Us" },
];
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 rounded";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav aria-label="Main" className={`fixed z-50 w-full border-b transition-all duration-300 motion-reduce:transition-none ${scrolled ? "border-cyan-400/15 bg-[#05050f]/90 shadow-[0_8px_30px_-12px_rgba(34,211,238,0.25)] backdrop-blur-2xl" : "border-white/10 bg-[#05050f]/70 backdrop-blur-md"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center justify-between transition-all duration-300 motion-reduce:transition-none ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className={`group flex items-center gap-2 ${focus}`}>
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-black tracking-tighter text-transparent transition-opacity group-hover:opacity-80">EduNexus</span>
          </Link>

          <div className="hidden items-center space-x-6 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors ${focus} ${active(l.href) ? "text-white" : "text-gray-400 hover:text-cyan-300"}`}>
                {l.label}
                <span aria-hidden className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-cyan-400 transition-transform duration-300 motion-reduce:transition-none ${active(l.href) ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            ))}

            <Link href="/ai-tutor" aria-current={active("/ai-tutor") ? "page" : undefined} className={`flex items-center gap-2 text-sm font-medium transition-colors ${focus} ${active("/ai-tutor") ? "text-purple-200" : "text-purple-400 hover:text-purple-300"}`}>
              <i className="fas fa-robot" aria-hidden></i> AI Tutor
            </Link>

            {status === "loading" ? (
              <div className="ml-4 h-10 w-24 animate-pulse rounded-xl bg-white/5"></div>
            ) : session ? (
              <div className="ml-2 flex items-center gap-4 border-l border-white/10 pl-6">
                {session.user?.image ? (
                  <Image src={session.user.image} alt="Profile" width={40} height={40} className="rounded-full border-2 border-cyan-500/50" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-500/50 bg-cyan-500/20 font-bold text-cyan-400">{session.user?.name?.charAt(0) || "U"}</div>
                )}
                <button onClick={() => signOut()} className={`text-sm font-medium text-gray-400 transition-colors hover:text-red-400 ${focus}`}>Sign Out</button>
              </div>
            ) : (
              <div className="ml-2 flex items-center gap-4 border-l border-white/10 pl-6">
                <Link href="/login" className={`text-sm font-medium text-gray-300 transition-colors hover:text-white ${focus}`}>Log In</Link>
                <Link href="/signup" className={`rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 ${focus}`}>Sign Up</Link>
              </div>
            )}
          </div>

          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-controls="mobile-menu" aria-label={isMenuOpen ? "Close menu" : "Open menu"} className={`p-2 text-gray-300 hover:text-white ${focus}`}>
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`} aria-hidden></i>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className={`grid transition-all duration-300 motion-reduce:transition-none lg:hidden ${isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="space-y-1 border-t border-white/10 bg-[#0a0a1a] px-6 py-4">
            {[...links, { href: "/ai-tutor", label: "AI Tutor" }].map((l) => (
              <Link key={l.href} href={l.href} tabIndex={isMenuOpen ? 0 : -1} aria-current={active(l.href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-3 text-sm font-medium ${focus} ${active(l.href) ? "bg-cyan-400/10 text-cyan-300" : "text-gray-300"}`}>
                {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-white/10 pt-3">
              {session ? (
                <button tabIndex={isMenuOpen ? 0 : -1} onClick={() => signOut()} className={`block w-full px-3 py-3 text-left text-sm font-medium text-red-400 ${focus}`}>Sign Out</button>
              ) : (
                <div className="flex flex-col">
                  <Link href="/login" tabIndex={isMenuOpen ? 0 : -1} className={`px-3 py-3 text-sm font-medium text-gray-300 ${focus}`}>Log In</Link>
                  <Link href="/signup" tabIndex={isMenuOpen ? 0 : -1} className={`px-3 py-3 text-sm font-medium text-cyan-400 ${focus}`}>Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
