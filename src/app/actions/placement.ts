"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { ApplicationStatus } from "@prisma/client";

export async function addApplication(formData: FormData, userId: string)  {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return { error: "You must be logged in to add applications." };
    }

    const userId = (session.user as any).id;
    const company = formData.get("company") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as ApplicationStatus;
    const salaryRaw = formData.get("salary") as string;
    const notes = formData.get("notes") as string;

    const salary = salaryRaw ? parseInt(salaryRaw.replace(/,/g, "")) : null;

    if (!company || !role || !status) {
      return { error: "Company, role, and status are required." };
    }

    // ✅ Matches your SQL table: PlacementApplication
    await db.placementApplication.create({
      data: {
        company,
        role,
        status,
        salary,
        notes,
        userId,
      },
    });

    // 🚀 This forces the /tracker page to refresh its data instantly
    revalidatePath("/tracker");
    return { success: true };
  } catch (error) {
    console.error("Failed to add application:", error);
    return { error: "Something went wrong. Please try again." };
  }
}