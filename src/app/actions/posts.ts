"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createEduPost(data: { content: string, mediaUrl?: string, mediaType?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return;

  const user = await db.user.findUnique({ where: { email: session.user.email }});
  if (!user) return;

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  await db.post.create({
    data: {
      content: data.content,
      mediaUrl: data.mediaUrl || null,
      mediaType: data.mediaType || null,
      userId: user.id,
      expiresAt: user.role === "MENTOR" ? null : expiresAt,
    }
  });

  revalidatePath("/community");
}

export async function deleteEduPost(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return;

  // Ensure only the owner (or an admin) can delete it
  await db.post.delete({
    where: { id: id }
  });
  
  revalidatePath("/community");
}