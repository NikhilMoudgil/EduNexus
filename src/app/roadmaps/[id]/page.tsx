import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getRoadmap, getRoadmaps, isSafeId } from "@/lib/roadmaps";
import { CATEGORIES } from "@/lib/roadmap-meta";

const mono = "font-mono text-[11px] tracking-wider text-white/45";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";
const shell = "relative min-h-screen overflow-x-hidden bg-[#05050f] px-4 pb-24 pt-28 text-white sm:px-6";

export default async function ViewRoadmapPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // LANE 1: official roadmap on disk (id is validated so it can't escape the content folder)
  const official = getRoadmap(id);
  if (official) {
    const cat = CATEGORIES.find((c) => c.key === official.category)!;
    const related = getRoadmaps().filter((r) => r.category === official.category && r.id !== id).slice(0, 3);
    return (
      <main className={shell}>
        <div aria-hidden className="pointer-events-none fixed -right-32 -top-32 h-[460px] w-[460px] rounded-full blur-[140px]" style={{ background: `${cat.color}18` }} />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Link href="/roadmaps" className={`mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white ${focus}`}><ArrowLeft className="h-4 w-4" aria-hidden /> All roadmaps</Link>
            <nav aria-label="Phases" className="border-l border-white/10">
              {official.phases.map((p, i) => (
                <a key={i} href={`#phase-${i + 1}`} className={`-ml-px block border-l border-transparent py-2 pl-4 text-sm text-gray-400 transition hover:border-[color:var(--c)] hover:text-white ${focus}`} style={{ ["--c" as string]: cat.color }}>
                  <span className={`${mono} block`}>PHASE 0{i + 1}</span>{p.title}
                </a>
              ))}
            </nav>
          </aside>

          <article>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: cat.color }}>{cat.label} · Official guide</p>
            <h1 className="mt-3 text-5xl font-black tracking-tighter sm:text-6xl">{official.title}</h1>
            {official.intro && <p className="mt-5 max-w-2xl text-lg text-gray-400">{official.intro.replace(/\*\*/g, "")}</p>}
            {official.skills.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills covered">
                {official.skills.map((s) => <li key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">{s}</li>)}
              </ul>
            )}

            <div className="mt-12 space-y-6">
              {official.phases.map((p, i) => (
                <section key={i} id={`phase-${i + 1}`} className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[.03] p-7 md:p-9">
                  <p className="font-mono text-4xl font-black" style={{ color: `${cat.color}88` }}>0{i + 1}</p>
                  <MarkdownRenderer content={p.markdown} />
                </section>
              ))}
            </div>

            {related.length > 0 && (
              <section className="mt-16" aria-label="Related roadmaps">
                <p className={`${mono} mb-4`}>NEXT UP IN {cat.label.toUpperCase()}</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <Link key={r.id} href={`/roadmaps/${r.id}`} className={`group rounded-2xl border border-white/10 bg-white/[.03] p-5 transition hover:-translate-y-1 hover:bg-white/[.06] motion-reduce:hover:translate-y-0 ${focus}`}>
                      <h3 className="font-bold">{r.title}</h3>
                      <span className="mt-3 flex items-center gap-1.5 text-sm text-gray-400 group-hover:text-white">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[.03] p-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-bold">Want this tailored to your goal?</p>
              <Link href="/generate" className={`inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-black hover:bg-white ${focus}`}>Build my roadmap <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </div>
          </article>
        </div>
      </main>
    );
  }

  // LANE 2: saved AI roadmap in the database
  const roadmap = await db.combinedPlan.findUnique({ where: { id } });
  // LANE 3: neither exists
  if (!roadmap) return notFound();

  return (
    <main className={shell}>
      <div aria-hidden className="pointer-events-none fixed -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-violet-600/10 blur-[140px]" />
      <div className="relative mx-auto max-w-4xl">
        <Link href="/roadmaps" className={`mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white ${focus}`}><ArrowLeft className="h-4 w-4" aria-hidden /> All roadmaps</Link>
        <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Your AI roadmap</p>
        <h1 className="mt-3 text-4xl font-black tracking-tighter sm:text-5xl">{roadmap.title}</h1>
        <p className={`${mono} mt-3`}>SAVED {new Date(roadmap.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()}</p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[.03] p-7 md:p-10">
          <MarkdownRenderer content={roadmap.plan || "Content not available."} />
        </div>
      </div>
    </main>
  );
}
