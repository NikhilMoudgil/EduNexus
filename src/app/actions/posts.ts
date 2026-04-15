"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createEduPost(data: { 
  content: string, 
  mediaUrl?: string, 
  mediaType?: string,
  externalLink?: string,
  pollData?: any 
}) {
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
      externalLink: data.externalLink || null,
      pollData: data.pollData || null,
      userId: user.id,
      // Verified mentors get permanent posts; students get 24h expiration
      expiresAt: user.role === "MENTOR" ? null : expiresAt,
      isVerified: user.role === "MENTOR" ? true : false,
    }
  });

  revalidatePath("/community");
}

export async function deleteEduPost(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return;

  await db.post.delete({ where: { id: id } });
  revalidatePath("/community");
}

export async function toggleLike(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return;

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) return;

  const existingLike = await db.like.findUnique({
    where: { postId_userId: { postId, userId: user.id } },
  });

  if (existingLike) {
    await db.like.delete({ where: { id: existingLike.id } });
  } else {
    await db.like.create({ data: { postId, userId: user.id } });
  }

  revalidatePath("/community");
}

export async function addComment(postId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !content.trim()) return;

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) return;

  await db.comment.create({
    data: { content, postId, userId: user.id },
  });

  revalidatePath("/community");
}