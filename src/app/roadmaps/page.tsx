import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getRoadmaps } from "@/lib/roadmaps";
import { CATEGORIES } from "@/lib/roadmap-meta";
import RoadmapSearch from "@/components/roadmaps/RoadmapSearch";

const mono = "font-mono text-[11px] tracking-wider text-white/45";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";

export default async function RoadmapsListingPage({ searchParams }: { searchParams: Promise<{ q?: string; cat?: string }> }) {
  const { q = "", cat = "all" } = await searchParams;
  const session = await getServerSession(authOptions);
  const roadmaps = getRoadmaps();
  const tracks = CATEGORIES.filter((c) => roadmaps.some((r) => r.category === c.key)).length;

  let userRoadmaps: any[] = [];
  if (session?.user) {
    userRoadmaps = await db.combinedPlan.findMany({ where: { userId: (session.user as any).id }, orderBy: { createdAt: "desc" } });
  }
  const latest = userRoadmaps[0];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050f] px-4 pb-24 pt-28 text-white sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.06]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(#000,transparent 50%)" }} />
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-32 h-[480px] w-[480px] rounded-full bg-cyan-900/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-10 max-w-3xl">
          <p className={`${mono} flex items-center gap-2`}><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> ROADMAPS / {roadmaps.length} PATHS / {tracks} TRACKS</p>
          <h1 className="mt-4 text-5xl font-black leading-[1.02] tracking-tighter sm:text-6xl">
            Find your path. <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">Build the skills that take you there.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-gray-400">Structured, phase-by-phase learning paths across development, data, cloud, security, design and business.</p>
        </header>

        <section aria-label="Start here" className="mb-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[.03] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={mono}>NOT SURE WHERE TO START?</p>
            <p className="mt-1 text-lg font-bold">
              {latest ? <>Pick up your AI roadmap: <Link href={`/roadmaps/${latest.id}`} className="text-cyan-300 underline-offset-4 hover:underline">{latest.title}</Link></> : "Tell EduNexus what you want to become."}
            </p>
          </div>
          <Link href="/generate" className={`inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-white ${focus}`}>
            Find my roadmap <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>

        <RoadmapSearch officialRoadmaps={roadmaps} userRoadmaps={userRoadmaps} isLoggedIn={!!session} initialQuery={q} initialCat={cat} />

        <section className="mt-24 rounded-[2.5rem] border border-white/10 bg-white/[.03] px-6 py-14 text-center">
          <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">Still not sure where to start?</h2>
          <p className="mx-auto mt-3 max-w-md text-gray-400">Describe your goal and let EduNexus build a roadmap around it.</p>
          <Link href="/generate" className={`mt-7 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-white ${focus}`}>
            Build my roadmap <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>
    </main>
  );
}