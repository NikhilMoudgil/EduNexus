"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { ApplicationStatus, OpportunityType } from "@prisma/client";

export async function addApplication(formData: FormData, userId: string)  {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return { error: "You must be logged in to add applications." };
    }

    const sessionUserId = (session.user as any).id;
    
    // Extract standard fields
    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as ApplicationStatus;
    const type = formData.get("type") as OpportunityType;
    const salaryRaw = formData.get("salary") as string;
    const notes = formData.get("notes") as string;
    
    // Extract new magic fields
    const link = formData.get("link") as string;
    const deadlineRaw = formData.get("deadline") as string;
    const tagsRaw = formData.get("tags") as string;

    // Formatting
    const salary = salaryRaw ? parseInt(salaryRaw.replace(/,/g, "")) : null;
    const deadline = deadlineRaw ? new Date(deadlineRaw) : null;
    
    // Convert comma-separated tags into a clean array
    const tags = tagsRaw 
      ? tagsRaw.split(",").map(tag => tag.trim()).filter(tag => tag !== "") 
      : [];

    if (!company || !role || !status) {
      return { error: "Company, role, and status are required." };
    }

    await db.placementApplication.create({
      data: {
        company,
        role,
        type: type || "JOB",
        status,
        salary,
        notes,
        link,
        deadline,
        tags,
        userId: sessionUserId,
      },
    });

    revalidatePath("/tracker");
    return { success: true };
  } catch (error) {
    console.error("Failed to add application:", error);
    return { error: "Something went wrong. Please try again." };
  }
}