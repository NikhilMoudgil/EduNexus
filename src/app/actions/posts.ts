"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createEduPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");

  const content = formData.get("content") as string;
  const userId = (session.user as any).id;
  const isMentor = (session.user as any).role === "MENTOR";

  await db.post.create({
    data: {
      content,
      userId: userId,
      isVerified: isMentor,
      // 🕒 Students: 24h TTL | Mentors: No expiry
      expiresAt: isMentor ? null : new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  revalidatePath("/community");
}

export async function deleteEduPost(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return;

  // Security check: Only delete if the user owns the post
  await db.post.deleteMany({
    where: {
      id: postId,
      userId: (session.user as any).id,
    },
  });

  revalidatePath("/community");
}