import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { Briefcase } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardClient from "@/components/tracker/DashboardClient";
import AddApplicationModal from "@/components/tracker/AddApplicationModal";
import TrackerTabs from "@/components/tracker/TrackerTabs";

export default async function PlacementTrackerPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !(session.user as any).id) {
    redirect("/login");
  }

  const userId = (session.user as any).id;

  const applications = await db.placementApplication.findMany({
    where: { userId: userId },
    orderBy: { dateApplied: "desc" },
  });

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#05050f] text-white pt-24 sm:pt-28 pb-24 px-4 sm:px-6">
      {/* Background Glowing Orbs */}
      <div className="fixed top-1/3 left-1/4 w-150 h-150 bg-blue-900/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/3 right-1/4 w-125 h-125 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6">
          <TrackerTabs />
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10">
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-black flex items-center gap-3 sm:gap-4 tracking-tighter">
              <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 shrink-0" />
              Placement Tracker
            </h1>
            <p className="text-gray-400 mt-2 font-medium text-sm sm:text-base">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl hover:bg-white/10 transition backdrop-blur-md font-semibold text-sm">
              Export Data
            </button>
            <AddApplicationModal userId={userId} />
          </div>
        </div>

        <DashboardClient initialData={applications} userId={userId} />
      </div>
    </div>
  );
}
