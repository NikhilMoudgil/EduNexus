import { db } from "@/lib/db";

const DAY = 86_400_000;

/**
 * Deletes listings nobody needs any more. Never deletes a listing a user has tracked.
 * Returns how many rows were removed.
 */
export async function cleanupOpportunities(): Promise<number> {
  const ago = (days: number) => new Date(Date.now() - days * DAY);

  const { count } = await db.opportunity.deleteMany({
    where: {
      // Tracked listings are always kept
      applications: { none: {} },
      OR: [
        // Adzuna only fetches the last 30 days, so a 45-day-old row can never be re-ingested
        { source: "adzuna", postedAt: { lt: ago(45) } },
        // Taken down by the ingest (gone from the board); 7-day grace for API hiccups
        { source: { in: ["adzuna", "greenhouse", "lever"] }, isActive: false, postedAt: { lt: ago(7) } },
        // Deadline passed more than 30 days ago, any source
        { deadline: { lt: ago(30) } },
      ],
    },
  });

  return count;
}
