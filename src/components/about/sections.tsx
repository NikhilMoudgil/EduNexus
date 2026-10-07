"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { founder, products, flow, problems, pillars, journey, stats } from "@/data/about";
import { Reveal, Tilt, Counter, Mono, useInView } from "./primitives";

const btn = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";

/* ---------- EduNexus Core: CSS-3D, zero WebGL, pauses off-screen ---------- */
export function Core3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(true);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting));
    io.observe(el); return () => io.disconnect();
  }, []);
  const onMove = (e: React.PointerEvent) => {
    const el = wrap.current; if (!el || e.pointerType === "touch") return;
    const b = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - b.top) / b.height - 0.5) * -14}deg`);
    el.style.setProperty("--ry", `${((e.clientX - b.left) / b.width - 0.5) * 14}deg`);
  };
  const nodes = ["Learning", "Skills", "Simulation", "Intelligence", "Career"];
  return (
    <div ref={wrap} onPointerMove={onMove} role="img" aria-label="Animated EduNexus core with orbiting rings"
      className="relative mx-auto aspect-square w-full max-w-[460px]" style={{ perspective: 900 }}>
      <div className="absolute inset-0 transition-transform duration-300" style={{ transformStyle: "preserve-3d", transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))", animationPlayState: run ? "running" : "paused" }}>
        {[["#00d9ff", 100, 22, 0], ["#d946ef", 78, 30, 1], ["#f5b942", 56, 38, 2]].map(([c, s, d, i]) => (
          <div key={i as number} className="en-ring absolute rounded-full border" style={{ borderColor: `${c}88`, boxShadow: `0 0 24px ${c}33`, inset: `${(100 - (s as number)) / 2}%`, animationDuration: `${d}s`, animationDelay: `${-(i as number) * 4}s`, animationPlayState: run ? "running" : "paused" }}>
            <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full" style={{ background: c as string, boxShadow: `0 0 12px ${c}` }} />
          </div>
        ))}
        <div className="en-core absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-2xl border border-white/30"
          style={{ background: "linear-gradient(135deg,#00d9ff,#6d28d9 55%,#d946ef)", boxShadow: "0 0 80px #00d9ff55, inset 0 0 30px #ffffff33", animationPlayState: run ? "running" : "paused" }} />
      </div>
      <ul className="absolute inset-x-0 -bottom-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
        {nodes.map((n) => <li key={n}><Mono>{n}</Mono></li>)}
      </ul>
    </div>
  );
}

export function AboutHero() {
  return (
    <section id="top" className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-28 pt-32 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <Mono className="mb-6 flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> ABOUT EDUNEXUS &nbsp;/&nbsp; SYSTEM ONLINE &nbsp;/&nbsp; BUILD 2026</Mono>
        <h1 className="text-5xl font-black leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
          Engineering the future of <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-500 bg-clip-text text-transparent">career readiness.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
          EduNexus connects learning, simulation and intelligence into one platform, so technical practice turns into measurable readiness. It is independently engineered by one developer with a much larger vision.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/dashboard" className={`${btn} bg-cyan-400 text-black hover:bg-white`}>Enter the Arena <ArrowRight className="h-4 w-4" /></Link>
          <a href="#builder" className={`${btn} border border-white/20 text-white hover:border-cyan-400`}>Meet the builder <ChevronDown className="h-4 w-4" /></a>
        </div>
      </div>
      <Core3D />
    </section>
  );
}

export function MissionSection() {
  const [ref, seen] = useInView<HTMLOListElement>(0.3);
  return (
    <section id="mission" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Students learn theory. Few get to practise under pressure.</h2>
          <p className="mt-5 text-gray-400">Most students leave college without:</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {problems.map((p) => <li key={p} className="rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm text-gray-300">{p}</li>)}
          </ul>
          <p className="mt-6 text-gray-300">EduNexus is the bridge: an engineering-focused ecosystem that turns learning into measurable career readiness.</p>
        </Reveal>
        <ol ref={ref} className="relative space-y-3 self-center" aria-label="EduNexus progression">
          {flow.map((f, i) => (
            <li key={f} className="flex items-center gap-4" style={{ opacity: seen ? 1 : 0.15, transform: seen ? "none" : "translateX(16px)", transition: `all .6s ${i * 220}ms` }}>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/60 font-mono text-xs text-cyan-300" style={{ boxShadow: seen ? "0 0 18px #00d9ff55" : "none" }}>{i + 1}</span>
              <span className="flex-1 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-lg font-bold">{f}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PillarsSection() {
  return (
    <section id="different" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-10 text-4xl font-black tracking-tight">Not another learning platform.</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ title, text, meta, color, icon: Icon }) => (
          <Tilt key={title} color={color} className="group h-full rounded-3xl border border-white/10 bg-white/[.04] p-7 hover:border-[color:var(--c)]">
            <Icon className="mb-5 h-7 w-7 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" style={{ color }} />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm text-gray-400">{text}</p>
            <Mono className="mt-5 block opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{meta}</Mono>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

export function FounderCard() {
  const [failed, setFailed] = useState(false);
  const { name, role, image, color, bio, statement, skills, links } = founder;
  return (
    <Tilt color={color} max={6} className="group mx-auto grid max-w-5xl gap-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.04] p-8 backdrop-blur md:grid-cols-[320px_1fr] md:p-12">
      <div className="relative mx-auto h-72 w-72" style={{ perspective: 800 }}>
        <div className="en-ring absolute inset-0 rounded-full border" style={{ borderColor: `${color}66`, animationDuration: "26s" }} />
        <div className="en-ring absolute inset-4 rounded-full border border-fuchsia-400/40" style={{ animationDuration: "18s", animationDirection: "reverse" }} />
        <div className="absolute inset-8 rounded-full" style={{ background: `radial-gradient(circle, ${color}44, transparent 70%)`, filter: "blur(18px)" }} />
        {failed ? (
          <div className="absolute inset-8 grid place-items-center rounded-full border border-white/20 bg-slate-900 text-5xl font-black" style={{ color }} aria-label={`${name} avatar placeholder`}>NM</div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={`Illustrated portrait of ${name}`} loading="lazy" onError={() => setFailed(true)}
            className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)] rounded-full border border-white/20 bg-slate-950 object-cover shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105" />
        )}
        <Mono className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">NODE 01 · FOUNDER / BUILDER</Mono>
      </div>
      <div className="self-center">
        <span className="inline-block rounded-full border px-3 py-1 text-xs font-bold" style={{ borderColor: `${color}66`, color }}>{role}</span>
        <h3 className="mt-4 text-4xl font-black tracking-tight">{name}</h3>
        <p className="mt-3 text-gray-300">{bio}</p>
        <p className="mt-3 text-sm text-gray-500">{statement}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {skills.map((s) => <li key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">{s}</li>)}
        </ul>
        <div className="mt-6 flex gap-5 text-sm font-bold">
          {links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">{l.label}</a>)}
        </div>
      </div>
    </Tilt>
  );
}

export function FounderSection() {
  const steps = ["One builder", "One vision", "Many systems", "One platform"];
  return (
    <section id="builder" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal className="mb-12 text-center">
        <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Built by one. Designed for many.</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">EduNexus is currently designed and engineered by a solo developer, which keeps every decision close to the product.</p>
      </Reveal>
      <Reveal><FounderCard /></Reveal>
      <ol className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2">
        {steps.map((s, i) => <li key={s} className="flex items-center gap-3"><Mono className="text-cyan-300/80">{s}</Mono>{i < steps.length - 1 && <ArrowRight aria-hidden className="h-3 w-3 text-white/30" />}</li>)}
      </ol>
    </section>
  );
}

export function EcosystemShowcase() {
  const [active, setActive] = useState(0);
  const p = products[active];
  const Icon = p.icon;
  return (
    <section id="platform" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-3 text-4xl font-black tracking-tight sm:text-5xl">One platform, nine modules.</h2>
      <p className="mb-10 max-w-xl text-gray-400">Select a module to inspect it. Status labels show what is live today and what is on the roadmap.</p>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Platform modules">
          {products.map((m, i) => {
            const I = m.icon;
            return (
              <li key={m.name}>
                <button role="tab" aria-selected={i === active} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                  className="flex w-full items-center gap-3 rounded-2xl border bg-white/[.03] px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                  style={{ borderColor: i === active ? m.color : "rgba(255,255,255,.1)", boxShadow: i === active ? `0 0 28px ${m.color}33` : "none" }}>
                  <I className="h-5 w-5 shrink-0" style={{ color: m.color }} />
                  <span className="flex-1 font-bold">{m.name}</span>
                  <Mono>{m.status}</Mono>
                </button>
              </li>
            );
          })}
        </ul>
        <Tilt color={p.color} max={5} className="group rounded-[2rem] border bg-slate-950/70 p-6" style={{ borderColor: `${p.color}55`, boxShadow: `0 0 60px ${p.color}22` }}>
          <div role="tabpanel" aria-live="polite">
            <div className="mb-5 flex gap-1.5" aria-hidden>{[0, 1, 2].map((d) => <i key={d} className="h-2.5 w-2.5 rounded-full bg-white/20" />)}</div>
            <div className="grid aspect-video place-items-center overflow-hidden rounded-xl border border-white/10" style={{ background: `linear-gradient(135deg, ${p.color}22, transparent)` }}>
              {p.image
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" className="h-full w-full object-cover" />
                : <Icon className="h-16 w-16" style={{ color: p.color }} aria-hidden />}
            </div>
            <Mono className="mt-5 block">{p.category.toUpperCase()}</Mono>
            <h3 className="mt-1 text-2xl font-black">{p.name}</h3>
            <p className="mt-2 text-gray-400">{p.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: `${p.color}55`, color: p.color }}>{t}</li>)}</ul>
          </div>
        </Tilt>
      </div>
    </section>
  );
}

export function JourneyTimeline() {
  return (
    <section id="journey" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="mb-12 text-4xl font-black tracking-tight">The journey so far.</h2>
      <ol className="relative border-l border-cyan-400/30 pl-8">
        {journey.map((j, i) => (
          <li key={j.title} className="mb-10 last:mb-0">
            <Reveal delay={i * 60}>
              <span className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 16px #00d9ff" }} aria-hidden />
              <Mono>0{i + 1}</Mono>
              <h3 className="text-xl font-bold">{j.title}</h3>
              <p className="mt-1 text-gray-400">{j.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ImpactStats() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#05050f] p-8 text-center">
            <dt className="order-2 mt-1 text-sm text-gray-500">{s.label}</dt>
            <dd className="text-5xl font-black text-cyan-300"><Counter to={s.value} /></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function FinalCTA() {
  const [ref, seen] = useInView<HTMLElement>(0.3);
  return (
    <section ref={ref} className="relative mx-auto my-24 max-w-5xl overflow-hidden rounded-[3rem] border border-white/10 px-6 py-20 text-center">
      <div aria-hidden className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: seen ? 1 : 0.2, background: "radial-gradient(circle at 50% 120%, #00d9ff44, #d946ef22 40%, transparent 70%)" }} />
      <div className="relative">
        <h2 className="text-4xl font-black tracking-tighter sm:text-6xl">Don&apos;t just prepare. Become the candidate.</h2>
        <p className="mx-auto mt-5 max-w-lg text-gray-400">Train in the Arena, see your skills clearly, and walk into interviews ready.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/arena" className={`${btn} bg-cyan-400 text-black hover:bg-white`}>Start training</Link>
          <a href="mailto:hello@edunexus.io" className={`${btn} border border-white/20 hover:border-fuchsia-400`}>Contact EduNexus</a>
        </div>
        <Mono className="mt-10 block">EDUNEXUS · BUILD 2026 · STATUS: ONLINE</Mono>
      </div>
    </section>
  );
}
