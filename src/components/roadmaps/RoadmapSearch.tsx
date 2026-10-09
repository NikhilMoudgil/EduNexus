"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Code2, Brain, Cloud, ShieldCheck, Palette, Briefcase, Cpu, type LucideIcon } from "lucide-react";
import { CATEGORIES, type CatKey, type RoadmapSummary } from "@/lib/roadmap-meta";
import { Reveal } from "@/components/about/primitives";

const ICONS: Record<CatKey, LucideIcon> = { dev: Code2, ai: Brain, cloud: Cloud, sec: ShieldCheck, design: Palette, biz: Briefcase, hw: Cpu };
const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.key, c])) as Record<CatKey, (typeof CATEGORIES)[number]>;
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";
const mono = "font-mono text-[11px] tracking-wider text-white/45";
const PAGE = 24;

function CategoryTag({ k }: { k: CatKey }) {
  const Icon = ICONS[k];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: CAT[k].color }}>
      <Icon className="h-3.5 w-3.5" aria-hidden /> {CAT[k].label}
    </span>
  );
}

function RoadmapCard({ r }: { r: RoadmapSummary }) {
  const c = CAT[r.category];
  return (
    <Link href={`/roadmaps/${r.id}`} className={`group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[.03] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[.06] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focus}`}>
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl border opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus-visible:opacity-60" style={{ borderColor: c.color }} />
      <CategoryTag k={r.category} />
      <h3 className="mt-3 text-xl font-black tracking-tight">{r.title}</h3>
      <ol className="mt-5 flex-1" aria-label="Phases">
        {r.phases.map((p, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex flex-col items-center">
              <i className="mt-1.5 h-2 w-2 rounded-full" style={{ background: c.color }} />
              {i < r.phases.length - 1 && <i className="w-px flex-1 bg-white/15" />}
            </span>
            <span className="pb-3 text-sm text-gray-400 transition-colors group-hover:text-gray-200">{p.title}</span>
          </li>
        ))}
      </ol>
      <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-4">
        <span className={mono}>{r.phases.length} PHASES</span>
        <span className="flex items-center gap-1.5 text-sm font-bold text-white">
          Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function Featured({ r }: { r: RoadmapSummary }) {
  const c = CAT[r.category];
  return (
    <Reveal className="mb-12">
      <Link href={`/roadmaps/${r.id}`} className={`group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.03] p-8 transition hover:border-white/25 md:p-10 ${focus}`}>
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[110px]" style={{ background: `${c.color}22` }} />
        <p className={mono}>FEATURED PATH</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <h2 className="text-4xl font-black tracking-tighter md:text-5xl">{r.title}</h2>
          <CategoryTag k={r.category} />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {r.phases.map((p, i) => (
            <div key={i} className="border-t border-white/10 pt-4">
              <p className={mono}>PHASE 0{i + 1}</p>
              <h3 className="mt-1 font-bold">{p.title}</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-400">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">{r.skills.map((s) => <li key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">{s}</li>)}</ul>
          <span className="flex items-center gap-2 font-bold" style={{ color: c.color }}>Explore roadmap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
        </div>
      </Link>
    </Reveal>
  );
}

function Tabs({ cat, setCat, counts, total }: { cat: string; setCat: (c: string) => void; counts: Record<string, number>; total: number }) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [ind, setInd] = useState({ left: 0, width: 0 });
  useLayoutEffect(() => {
    const el = refs.current[cat];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [cat]);
  const items = [{ key: "all", label: "All", n: total }, ...CATEGORIES.filter((c) => counts[c.key]).map((c) => ({ key: c.key as string, label: c.label, n: counts[c.key] }))];
  return (
    <nav aria-label="Categories" className="relative -mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none]">
      {items.map((t) => (
        <button key={t.key} ref={(el) => { refs.current[t.key] = el; }} onClick={() => setCat(t.key)} aria-pressed={cat === t.key}
          className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${focus} ${cat === t.key ? "text-white" : "text-gray-500 hover:text-gray-200"}`}>
          {t.label} <span className="ml-1 font-mono text-[11px] opacity-60">{t.n}</span>
        </button>
      ))}
      <span aria-hidden className="absolute bottom-0 h-0.5 rounded bg-cyan-400 transition-all duration-300 motion-reduce:transition-none" style={{ left: ind.left, width: ind.width }} />
    </nav>
  );
}

export default function RoadmapSearch({ officialRoadmaps, userRoadmaps, isLoggedIn, initialQuery = "", initialCat = "all" }: {
  officialRoadmaps: RoadmapSummary[]; userRoadmaps: any[]; isLoggedIn: boolean; initialQuery?: string; initialCat?: string;
}) {
  const [input, setInput] = useState(initialQuery);
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState(initialCat);
  const [sort, setSort] = useState<"recommended" | "az">("recommended");
  const [shown, setShown] = useState(PAGE);

  useEffect(() => { const t = setTimeout(() => setQ(input.trim().toLowerCase()), 150); return () => clearTimeout(t); }, [input]);
  useEffect(() => { setShown(PAGE); }, [q, cat, sort]);
  useEffect(() => { // shareable URL, no navigation
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (cat !== "all") p.set("cat", cat);
    window.history.replaceState(null, "", p.size ? `?${p}` : window.location.pathname);
  }, [q, cat]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    officialRoadmaps.forEach((r) => { m[r.category] = (m[r.category] || 0) + 1; });
    return m;
  }, [officialRoadmaps]);

  const results = useMemo(() => {
    let list = officialRoadmaps.filter((r) => {
      if (cat !== "all" && r.category !== cat) return false;
      if (!q) return true;
      const hay = [r.title, r.id.replace(/_/g, " "), CAT[r.category].label, ...r.skills, ...r.phases.flatMap((p) => [p.title, ...p.points])].join(" ").toLowerCase();
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
    if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [officialRoadmaps, q, cat, sort]);

  const mine = userRoadmaps.filter((r) => !q || r.title.toLowerCase().includes(q));
  const featured = officialRoadmaps[0];
  const filtering = !!q || cat !== "all";
  const clear = () => { setInput(""); setQ(""); setCat("all"); };

  return (
    <div>
      {/* Sticky discovery bar */}
      <div className="sticky top-16 z-40 -mx-4 border-b border-white/10 bg-[#05050f]/85 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden />
              <input type="search" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Escape" && setInput("")}
                aria-label="Search roadmaps, skills or careers" placeholder="Search roadmaps, skills or careers..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-white outline-none placeholder:text-gray-500 focus:border-cyan-400/50 [&::-webkit-search-cancel-button]:hidden" />
              {input && <button onClick={() => setInput("")} aria-label="Clear search" className={`absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-white ${focus}`}><X className="h-4 w-4" /></button>}
            </div>
            <label className="sr-only" htmlFor="rm-sort">Sort roadmaps</label>
            <select id="rm-sort" value={sort} onChange={(e) => setSort(e.target.value as any)} className={`rounded-2xl border border-white/10 bg-[#0a0a18] px-3 text-sm text-gray-300 ${focus}`}>
              <option value="recommended">Recommended</option>
              <option value="az">A–Z</option>
            </select>
          </div>
          <Tabs cat={cat} setCat={setCat} counts={counts} total={officialRoadmaps.length} />
        </div>
      </div>

      <div className="pt-10">
        {!filtering && featured && <Featured r={featured} />}

        {isLoggedIn && cat === "all" && mine.length > 0 && (
          <section className="mb-14" aria-label="Your AI roadmaps">
            <p className={`${mono} mb-4`}>YOUR AI ROADMAPS</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mine.map((r) => (
                <Link key={r.id} href={`/roadmaps/${r.id}`} className={`group rounded-2xl border border-violet-400/20 bg-violet-500/[.05] p-5 transition hover:-translate-y-1 hover:border-violet-400/50 motion-reduce:hover:translate-y-0 ${focus}`}>
                  <h3 className="font-bold">{r.title}</h3>
                  <p className="mt-1 text-xs text-gray-500">Generated {new Date(r.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" })}</p>
                  <span className="mt-4 flex items-center gap-1.5 text-sm font-bold text-violet-300">View plan <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-2xl font-black tracking-tight">{filtering ? "Results" : "Explore roadmaps"}</h2>
          <p className={mono} aria-live="polite">{results.length} {results.length === 1 ? "ROADMAP" : "ROADMAPS"}</p>
        </div>

        {results.length ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, shown).map((r, i) => <Reveal key={r.id} delay={(i % 3) * 60} className="h-full"><RoadmapCard r={r} /></Reveal>)}
            </div>
            {results.length > shown && (
              <div className="mt-10 text-center">
                <button onClick={() => setShown(shown + PAGE)} className={`rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition hover:border-cyan-400 ${focus}`}>Show more ({results.length - shown} left)</button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center">
            <p className={mono}>NO PATH FOUND</p>
            <p className="mt-3 text-lg text-gray-300">We couldn&apos;t find a roadmap matching that search.</p>
            <p className="mt-4 text-sm text-gray-500">Try:</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {["React", "Python", "Cloud", "Security"].map((s) => <button key={s} onClick={() => { setCat("all"); setInput(s); }} className={`rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300 hover:border-cyan-400 ${focus}`}>{s}</button>)}
            </div>
            <button onClick={clear} className={`mt-6 rounded-full bg-cyan-400 px-5 py-2 text-sm font-bold text-black hover:bg-white ${focus}`}>Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
