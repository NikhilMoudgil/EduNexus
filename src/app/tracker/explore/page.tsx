import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ChevronLeft, ChevronRight, Compass, SearchX } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import ExploreFilters from "@/components/tracker/ExploreFilters";
import OpportunityCard from "@/components/tracker/OpportunityCard";
import LiveFeedBanner from "@/components/tracker/LiveFeedBanner";
import TrackerTabs from "@/components/tracker/TrackerTabs";

const PAGE_SIZE = 12;
const BASE_PATH = "/tracker/explore";
// Must match the values of your OpportunityType enum
const VALID_TYPES = ["INTERNSHIP", "JOB", "HACKATHON", "CASE_COMPETITION", "OPEN_SOURCE"];

type SearchParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const toInt = (v: string | undefined) => {
  const n = parseInt(v ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export default async function ExplorePage({
  searchParams,
}: {
  // Next 15+: searchParams is a Promise. On Next 14, remove the Promise and the await below.
  searchParams: Promise<SearchParams>;
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) redirect("/login");

  const sp = await searchParams;
  const q = first(sp.q)?.trim() || undefined;
  const types = (first(sp.type) ?? "")
    .split(",")
    .filter((t) => VALID_TYPES.includes(t));
  const remote = first(sp.remote) === "1";
  const minStipend = toInt(first(sp.minStipend));
  const closing = toInt(first(sp.closing));
  const sort = first(sp.sort) ?? "new";
  const page = toInt(first(sp.page)) ?? 1;

  const now = new Date();

  // Build the filter. Listings past their deadline are always hidden.
  const and: any[] = [
    { isActive: true },
    { OR: [{ deadline: null }, { deadline: { gte: now } }] },
  ];
  if (q) {
    and.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { company: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
        { tags: { has: q } },
      ],
    });
  }
  if (types.length) and.push({ type: { in: types } });
  if (remote) and.push({ remote: true });
  if (minStipend) and.push({ stipendMax: { gte: minStipend } });
  if (closing) {
    and.push({
      deadline: { gte: now, lte: new Date(now.getTime() + closing * 86_400_000) },
    });
  }
  const where = { AND: and };

  const orderBy: any[] =
    sort === "deadline"
      ? [{ deadline: { sort: "asc", nulls: "last" } }, { postedAt: "desc" }]
      : sort === "stipend"
      ? [{ stipendMax: { sort: "desc", nulls: "last" } }, { postedAt: "desc" }]
      : [{ postedAt: "desc" }];

  const [items, total] = await Promise.all([
    db.opportunity.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.opportunity.count({ where }),
  ]);

  // Which of these listings has this user already tracked?
  const tracked = await db.placementApplication.findMany({
    where: { userId, opportunityId: { in: items.map((i) => i.id) } },
    select: { opportunityId: true },
  });
  const trackedIds = new Set(tracked.map((t) => t.opportunityId));

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) {
      const val = first(v);
      if (val && k !== "page") params.set(k, val);
    }
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return s ? `${BASE_PATH}?${s}` : BASE_PATH;
  };

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-28 pb-12 px-6">
      <div className="fixed top-1/3 left-1/4 w-150 h-150 bg-blue-900/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-1/3 right-1/4 w-125 h-125 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        <div>
          <div className="mb-6">
            <TrackerTabs />
          </div>
          <h1 className="text-4xl font-black flex items-center gap-4 tracking-tighter">
            <Compass className="w-8 h-8 text-cyan-400" />
            Explore opportunities
          </h1>
          <p className="text-gray-400 mt-2 font-medium">
            {total} open {total === 1 ? "listing" : "listings"}. Track one and it moves into your pipeline.
          </p>
        </div>

        <LiveFeedBanner />

        <ExploreFilters />

        {items.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl py-20 px-6 text-center backdrop-blur-xl">
            <SearchX className="w-10 h-10 text-gray-600 mx-auto mb-4" />
            <p className="text-white font-bold text-lg">Nothing matches these filters</p>
            <p className="text-gray-500 text-sm mt-1">
              Remove a filter or widen the stipend and deadline range.
            </p>
            <Link
              href={BASE_PATH}
              className="inline-block mt-5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition"
            >
              Clear all filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {items.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} tracked={trackedIds.has(opp.id)} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-3 pt-4" aria-label="Pagination">
            {page > 1 ? (
              <Link
                href={pageHref(page - 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-semibold transition"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Link>
            ) : (
              <span className="flex items-center gap-1 px-4 py-2 rounded-xl border border-white/5 text-sm text-gray-600">
                <ChevronLeft className="w-4 h-4" /> Previous
              </span>
            )}
            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={pageHref(page + 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-semibold transition"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="flex items-center gap-1 px-4 py-2 rounded-xl border border-white/5 text-sm text-gray-600">
                Next <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
