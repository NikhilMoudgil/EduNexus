import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { Briefcase } from "lucide-react";
// 🚀 IMPORT THE AUTH OPTIONS FROM YOUR ROUTE FILE
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardClient from "@/components/tracker/DashboardClient";
import AddApplicationModal from "@/components/tracker/AddApplicationModal";

export default async function PlacementTrackerPage() {
  // 🚀 PASS AUTH OPTIONS HERE
  // This allows getServerSession to see the 'id' you added in the callbacks
  const session = await getServerSession(authOptions);

  // 1. Security Check
  // Now that we passed authOptions, (session.user as any).id will be defined
  if (!session?.user || !(session.user as any).id) {
    redirect("/login");
  }

  // Extract the ID safely to use in our queries
  const userId = (session.user as any).id;

  // 2. Fetch applications using the extracted ID
  const applications = await db.placementApplication.findMany({
    where: { userId: userId },
    orderBy: { dateApplied: "desc" },
  });

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-28 pb-12 px-6">
      {/* Background Glowing Orbs */}
      <div className="fixed top-1/3 left-1/4 w-150 h-150 bg-blue-900/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/3 right-1/4 w-125 h-125 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black flex items-center gap-4 tracking-tighter">
              <Briefcase className="w-8 h-8 text-cyan-400" />
              Placement Tracker
            </h1>
            <p className="text-gray-400 mt-2 font-medium">Track your job applications and interview progress in real-time.</p>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl hover:bg-white/10 transition backdrop-blur-md font-semibold text-sm">
              Export Data
            </button>
           <AddApplicationModal userId={userId} />
          </div>
        </div>

        {/* 🚀 RENDER THE DASHBOARD CLIENT */}
        <DashboardClient initialData={applications} userId={userId} />
        
      </div>
    </div>
  );
}