"use client";

import { PlacementApplication } from "@prisma/client";
import { ExternalLink, Calendar as CalendarIcon } from "lucide-react";

const statusColors: Record<string, string> = {
  BOOKMARKED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  SENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ASSESSMENT_PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  INTERVIEWING: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  OFFERED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  GHOSTED: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

const typeColors: Record<string, string> = {
  JOB: "bg-blue-500/20 text-blue-300",
  INTERNSHIP: "bg-teal-500/20 text-teal-300",
  HACKATHON: "bg-fuchsia-500/20 text-fuchsia-300",
  CASE_COMPETITION: "bg-orange-500/20 text-orange-300",
  OPEN_SOURCE: "bg-pink-500/20 text-pink-300",
};

export default function RecentApplications({ applications }: { applications: PlacementApplication[] }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Recent Opportunities</h3>
        <button className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
              <th className="pb-4 font-semibold pl-4">Opportunity</th>
              <th className="pb-4 font-semibold">Type & Skills</th>
              <th className="pb-4 font-semibold">Status</th>
              <th className="pb-4 font-semibold">Deadline / Date</th>
              <th className="pb-4 font-semibold text-right pr-4">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  No opportunities tracked yet. Time to hunt!
                </td>
              </tr>
            ) : (
              applications.slice(0, 7).map((app) => (
                <tr key={app.id} className="hover:bg-white/2 transition-colors group">
                  
                  {/* Company & Role */}
                  <td className="py-4 pl-4">
                    <div className="font-bold text-white text-base">{app.company}</div>
                    <div className="text-sm text-gray-400">{app.role}</div>
                  </td>

                  {/* Type Badge & Tags */}
                  <td className="py-4">
                    <div className="flex flex-col gap-2 items-start">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${typeColors[app.type] || "bg-gray-500/20 text-gray-300"}`}>
                        {app.type.replace("_", " ")}
                      </span>
                      {app.tags && app.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap max-w-[200px]">
                          {app.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] bg-white/5 border border-white/10 text-gray-400 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                          {app.tags.length > 3 && <span className="text-[10px] text-gray-500">+{app.tags.length - 3}</span>}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[app.status] || statusColors.SENT}`}>
                      {app.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Deadline or Applied Date */}
                  <td className="py-4 text-sm text-gray-300">
                    {app.deadline ? (
                       <div className="flex items-center gap-1.5 text-yellow-400/90">
                         <CalendarIcon className="w-3.5 h-3.5" />
                         {new Date(app.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                       </div>
                    ) : (
                      <span className="text-gray-500">
                        Applied: {new Date(app.dateApplied).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    )}
                  </td>

                  {/* Link Action */}
                  <td className="py-4 text-right pr-4">
                    {app.link ? (
                      <a href={app.link} target="_blank" rel="noopener noreferrer" className="inline-flex text-cyan-500 hover:text-cyan-300 transition-colors p-2 hover:bg-white/5 rounded-lg">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-gray-600 text-sm">-</span>
                    )}
                  </td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}