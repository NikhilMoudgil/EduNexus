"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function saveRoadmap(title: string, content: string, summary?: string) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const saved = await db.combinedPlan.create({
      data: {
        userId: user.id,
        title,
        plan: content, // Fixed: Mapped 'content' parameter to the 'plan' field in Prisma schema
      },
    });

    return { success: true, id: saved.id };
  } catch (error: any) {
    console.error("Failed to save roadmap:", error);
    return { success: false, error: error.message || "Failed to save roadmap" };
  }
}