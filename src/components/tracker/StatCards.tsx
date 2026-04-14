"use client";

import { PlacementApplication } from "@prisma/client";
import { FileText, Handshake, Trophy, DollarSign } from "lucide-react";

export default function StatCards({ applications }: { applications: PlacementApplication[] }) {
  const total = applications.length;
  const interviews = applications.filter((a) => a.status === "INTERVIEWING").length;
  const offers = applications.filter((a) => a.status === "OFFERED").length;
  
  const applicationsWithSalary = applications.filter((a) => a.salary && a.status === "OFFERED");
  const avgSalary = applicationsWithSalary.length > 0
    ? applicationsWithSalary.reduce((sum, app) => sum + (app.salary || 0), 0) / applicationsWithSalary.length
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Applications" value={total} icon={<FileText className="text-blue-400" />} />
      <StatCard title="Interviews" value={interviews} icon={<Handshake className="text-purple-400" />} />
      <StatCard title="Offers" value={offers} icon={<Trophy className="text-green-400" />} />
      <StatCard 
        title="Avg. Salary" 
        value={`$${avgSalary.toLocaleString()}`} 
        icon={<DollarSign className="text-yellow-400" />} 
        subtext="For accepted offers"
      />
    </div>
  );
}

function StatCard({ title, value, icon, subtext }: { title: string, value: string | number, icon: React.ReactNode, subtext?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-black text-white">{value}</h3>
          {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
    </div>
  );
}