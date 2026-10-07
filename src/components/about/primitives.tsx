"use client";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const f = () => setR(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return r;
}

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/** One-shot reveal. Content is visible without JS motion when reduced motion is on. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  const reduced = useReducedMotion();
  const show = seen || reduced;
  return (
    <div ref={ref} className={className}
      style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(24px)", transition: `opacity .7s ${delay}ms, transform .7s ${delay}ms cubic-bezier(.2,.7,.2,1)` }}>
      {children}
    </div>
  );
}

/** Lightweight pointer tilt + cursor glow. No-ops on touch and reduced motion. */
export function Tilt({ children, color = "#00d9ff", max = 8, className = "", style }: { children: ReactNode; color?: string; max?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduced || e.pointerType === "touch") return;
    const b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave}
      className={`relative transition-transform duration-200 will-change-transform ${className}`}
      style={{ ["--c" as string]: color, ...style }}>
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(260px circle at var(--mx,50%) var(--my,50%), ${color}22, transparent 70%)` }} />
      {children}
    </div>
  );
}

export function Counter({ to }: { to: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.5);
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced) return setN(to);
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, reduced]);
  return <span ref={ref}>{n}</span>;
}

export const Mono = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`font-mono text-[11px] tracking-wider text-white/40 ${className}`}>{children}</span>
);
