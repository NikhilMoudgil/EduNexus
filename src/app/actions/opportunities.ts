"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function trackOpportunity(opportunityId: string) {
  // Always take the user from the session, never from a client-supplied argument
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) return { success: false, error: "Sign in to track opportunities" };

  const opp = await db.opportunity.findUnique({ where: { id: opportunityId } });
  if (!opp || !opp.isActive) {
    return { success: false, error: "This listing is no longer available" };
  }

  const existing = await db.placementApplication.findFirst({
    where: { userId, opportunityId },
    select: { id: true },
  });
  if (existing) return { success: false, error: "Already in your tracker" };

  try {
    await db.placementApplication.create({
      data: {
        userId,
        opportunityId,
        company: opp.company,
        role: opp.title,
        type: opp.type,
        status: "BOOKMARKED",
        link: opp.applyUrl,
        deadline: opp.deadline,
        tags: opp.tags,
        salary: opp.stipendMax ?? opp.stipendMin ?? null,
      },
    });
  } catch {
    // The @@unique([userId, opportunityId]) constraint catches a double-click race
    return { success: false, error: "Already in your tracker" };
  }

  revalidatePath("/tracker");
  return { success: true as const };
}
