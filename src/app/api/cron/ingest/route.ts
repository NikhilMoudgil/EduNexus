import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  GREENHOUSE_BOARDS,
  LEVER_COMPANIES,
  INTERN_PATTERN,
  LOCATION_PATTERN,
  ADZUNA_QUERIES,
  ADZUNA_PAGES,
} from "@/lib/ingest/config";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Normalized = {
  externalId: string;
  title: string;
  location: string | null;
  remote: boolean;
  applyUrl: string;
  postedAt: Date;
};

type Target = { source: "greenhouse" | "lever"; name: string; fetchJobs: () => Promise<Normalized[]> };
type TargetResult = { source: string; company: string; ok: boolean; fetched?: number; kept?: number; error?: string };

async function getJson(url: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000), cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const safeDate = (value: unknown) => {
  const d = new Date(value as string | number);
  return isNaN(d.getTime()) ? new Date() : d;
};

function shouldKeep(job: Normalized) {
  if (!job.applyUrl || !INTERN_PATTERN.test(job.title)) return false;
  if (!LOCATION_PATTERN) return true;
  return !!job.location && LOCATION_PATTERN.test(job.location);
}

function greenhouse(token: string, name: string): Target {
  return {
    source: "greenhouse",
    name,
    fetchJobs: async () => {
      const data = await getJson(`https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(token)}/jobs`);
      return (data.jobs ?? []).map((j: any) => ({
        externalId: String(j.id),
        title: String(j.title ?? ""),
        location: j.location?.name ?? null,
        remote: /remote/i.test(j.location?.name ?? ""),
        applyUrl: j.absolute_url,
        postedAt: safeDate(j.first_published ?? j.updated_at),
      }));
    },
  };
}

function lever(slug: string, name: string): Target {
  return {
    source: "lever",
    name,
    fetchJobs: async () => {
      const data = await getJson(`https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`);
      return (Array.isArray(data) ? data : []).map((j: any) => {
        const location: string | null = j.categories?.location ?? null;
        return {
          externalId: String(j.id),
          title: String(j.text ?? ""),
          location,
          remote: j.workplaceType === "remote" || /remote/i.test(location ?? ""),
          applyUrl: j.hostedUrl,
          postedAt: safeDate(j.createdAt),
        };
      });
    },
  };
}

async function processTarget(t: Target): Promise<TargetResult> {
  try {
    const all = await t.fetchJobs();
    const kept = all.filter(shouldKeep);

    for (const j of kept) {
      await db.opportunity.upsert({
        where: { source_externalId: { source: t.source, externalId: j.externalId } },
        update: {
          title: j.title,
          location: j.location,
          remote: j.remote,
          applyUrl: j.applyUrl,
          isActive: true,
        },
        create: {
          source: t.source,
          externalId: j.externalId,
          title: j.title,
          company: t.name,
          type: "INTERNSHIP",
          location: j.location,
          remote: j.remote,
          applyUrl: j.applyUrl,
          postedAt: j.postedAt,
          tags: [],
          currency: "INR",
        },
      });
    }

    // Listings this board no longer shows have been filled or taken down.
    // Skip when the board came back empty, in case the API had a hiccup.
    if (all.length > 0) {
      await db.opportunity.updateMany({
        where: {
          source: t.source,
          company: t.name,
          isActive: true,
          externalId: { notIn: kept.map((j) => j.externalId) },
        },
        data: { isActive: false },
      });
    }

    return { source: t.source, company: t.name, ok: true, fetched: all.length, kept: kept.length };
  } catch (e) {
    return { source: t.source, company: t.name, ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}


// Adzuna returns jobs from many companies, so company is per job rather than per board.
// Its listings are retired by age (below) instead of the per-board sweep, because a search
// only ever returns the newest pages, not every open listing.
async function processAdzuna(): Promise<TargetResult> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) {
    return { source: "adzuna", company: "(all)", ok: false, error: "ADZUNA_APP_ID / ADZUNA_APP_KEY not set, skipped" };
  }

  try {
    const found = new Map<string, any>();
    for (const query of ADZUNA_QUERIES) {
      for (let page = 1; page <= ADZUNA_PAGES; page++) {
        const params = new URLSearchParams({
          app_id: appId,
          app_key: appKey,
          what: query,
          results_per_page: "50",
          sort_by: "date",
          max_days_old: "30",
          "content-type": "application/json",
        });
        const data = await getJson(`https://api.adzuna.com/v1/api/jobs/in/search/${page}?${params}`);
        const results: any[] = data.results ?? [];
        for (const j of results) found.set(String(j.id), j);
        if (results.length < 50) break;
      }
    }

    async function save([id, j]: [string, any]): Promise<boolean> {
      const title = String(j.title ?? "").replace(/<[^>]+>/g, "").trim();
      const company = String(j.company?.display_name ?? "").trim();
      if (!title || !company || !j.redirect_url || !INTERN_PATTERN.test(title)) return false;

      // Skip it if another source already lists the same role at the same company
      const duplicate = await db.opportunity.findFirst({
        where: {
          isActive: true,
          NOT: { source: "adzuna" },
          company: { equals: company, mode: "insensitive" },
          title: { equals: title, mode: "insensitive" },
        },
        select: { id: true },
      });
      if (duplicate) return false;

      const location: string | null = j.location?.display_name ?? null;
      await db.opportunity.upsert({
        where: { source_externalId: { source: "adzuna", externalId: id } },
        update: { title, company, location, applyUrl: j.redirect_url, isActive: true },
        create: {
          source: "adzuna",
          externalId: id,
          title,
          company,
          type: "INTERNSHIP",
          location,
          remote: /remote|work from home/i.test(`${title} ${location ?? ""}`),
          applyUrl: j.redirect_url, // Adzuna asks that you send people through its own link
          postedAt: safeDate(j.created),
          tags: [],
          currency: "INR",
          // Salary is left empty on purpose: Adzuna's figures are often yearly estimates,
          // and the card shows internship stipends per month.
        },
      });
      return true;
    }

    const entries = [...found.entries()];
    let kept = 0;
    for (let i = 0; i < entries.length; i += 10) {
      const saved = await Promise.all(entries.slice(i, i + 10).map(save));
      kept += saved.filter(Boolean).length;
    }
    return { source: "adzuna", company: "(all)", ok: true, fetched: found.size, kept };
  } catch (e) {
    return { source: "adzuna", company: "(all)", ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not set" }, { status: 500 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const targets: Target[] = [
    ...GREENHOUSE_BOARDS.map((b) => greenhouse(b.token, b.name)),
    ...LEVER_COMPANIES.map((c) => lever(c.slug, c.name)),
  ];

  // Four boards at a time keeps the run fast without hammering anyone
  const results: TargetResult[] = [];
  for (let i = 0; i < targets.length; i += 4) {
    results.push(...(await Promise.all(targets.slice(i, i + 4).map(processTarget))));
  }

  results.push(await processAdzuna());

  // Adzuna listings older than 45 days are assumed filled
  await db.opportunity.updateMany({
    where: { source: "adzuna", isActive: true, postedAt: { lt: new Date(Date.now() - 45 * 86_400_000) } },
    data: { isActive: false },
  });

  // Anything past its deadline comes off the feed, whatever its source
  const expired = await db.opportunity.updateMany({
    where: { isActive: true, deadline: { lt: new Date() } },
    data: { isActive: false },
  });

  return NextResponse.json({
    ok: true,
    ranAt: new Date().toISOString(),
    expiredByDeadline: expired.count,
    results,
  });
}
