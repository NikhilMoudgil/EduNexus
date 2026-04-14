"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function saveRoadmap(title: string, content: string, summary: string) {
  const session = await getServerSession();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("User not found");

  return await db.combinedPlan.create({
    data: {
      title,
      plan: content,
      userId: user.id,
    }
  });
}