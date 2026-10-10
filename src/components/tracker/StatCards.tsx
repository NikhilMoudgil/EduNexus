"use client";

import { PlacementApplication } from "@prisma/client";
import { FileText, Code, Clock, Trophy } from "lucide-react";

export default function StatCards({ applications }: { applications: PlacementApplication[] }) {
  const total = applications.length;

  const assessmentsPending = applications.filter((a) => a.status === "ASSESSMENT_PENDING").length;
  const competitions = applications.filter((a) => a.type === "HACKATHON" || a.type === "CASE_COMPETITION").length;
  const winsAndOffers = applications.filter((a) => a.status === "OFFERED").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <StatCard
        title="Total Tracked"
        value={total}
        icon={<FileText className="w-5 h-5 text-blue-400" />}
        subtext="Jobs, Internships & Comps"
      />
      <StatCard
        title="Competitions"
        value={competitions}
        icon={<Code className="w-5 h-5 text-fuchsia-400" />}
        subtext="Hackathons & Case Studies"
      />
      <StatCard
        title="Pending Action"
        value={assessmentsPending}
        icon={<Clock className="w-5 h-5 text-yellow-400" />}
        subtext="Assessments to complete"
      />
      <StatCard
        title="Wins & Offers"
        value={winsAndOffers}
        icon={<Trophy className="w-5 h-5 text-green-400" />}
        subtext="Cleared everything!"
      />
    </div>
  );
}

function StatCard({ title, value, icon, subtext }: { title: string; value: string | number; icon: React.ReactNode; subtext?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-all duration-300 min-w-0">
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-black text-white">{value}</h3>
          {subtext && <p className="text-[11px] sm:text-xs text-gray-500 mt-2">{subtext}</p>}
        </div>
        <div className="p-2 sm:p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}
