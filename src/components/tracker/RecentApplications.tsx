"use client";

import { PlacementApplication } from "@prisma/client";

const statusColors = {
  SENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  INTERVIEWING: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  OFFERED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function RecentApplications({ applications }: { applications: PlacementApplication[] }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Recent Applications</h3>
        <button className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
              <th className="pb-4 font-semibold pl-4">Company & Role</th>
              <th className="pb-4 font-semibold">Date Applied</th>
              <th className="pb-4 font-semibold">Status</th>
              <th className="pb-4 font-semibold">Salary</th>
              <th className="pb-4 font-semibold text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  No applications tracked yet. Click "New Application" to get started!
                </td>
              </tr>
            ) : (
              applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-white/2 transition-colors group">
                  <td className="py-4 pl-4">
                    <div className="font-bold text-white text-base">{app.company}</div>
                    <div className="text-sm text-gray-400">{app.role}</div>
                  </td>
                  <td className="py-4 text-sm text-gray-300">
                    {new Date(app.dateApplied).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm font-medium text-gray-300">
                    {app.salary ? `$${app.salary.toLocaleString()}` : <span className="text-gray-600">-</span>}
                  </td>
                  <td className="py-4 text-right pr-4">
                    <button className="text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      Edit
                    </button>
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