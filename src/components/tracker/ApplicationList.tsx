import { motion } from "framer-motion";
import { ExternalLink, MoreVertical, Link2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ApplicationList({ applications }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-900/80 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium">Opportunity</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Status</th>
              <th className="px-6 py-4 font-medium hidden lg:table-cell">Applied</th>
              <th className="px-6 py-4 font-medium hidden sm:table-cell">Next Round</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {applications.map((app, idx) => (
              <motion.tr initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.3) }} key={app.id} className="hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-200">{app.company}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{app.role} • <span className="text-slate-500">{app.type.replace('_', ' ')}</span></div>
                  <div className="mt-2 md:hidden"><StatusBadge status={app.status} /></div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell"><StatusBadge status={app.status} /></td>
                <td className="px-6 py-4 hidden lg:table-cell text-slate-400 text-xs">
                  {new Date(app.dateApplied).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  {app.rounds?.length > 0 ? (
                    <span className="text-cyan-400 text-xs bg-cyan-400/10 border border-cyan-400/20 px-2 py-1 rounded-md">
                      {app.rounds[app.rounds.length - 1].title}
                    </span>
                  ) : <span className="text-slate-600">—</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    {app.link && (
                      <a href={app.link} target="_blank" rel="noreferrer" className="p-1.5 text-slate-500 hover:text-cyan-400 bg-slate-800/50 rounded-md transition-colors"><ExternalLink className="w-4 h-4" /></a>
                    )}
                    <button className="p-1.5 text-slate-500 hover:text-white bg-slate-800/50 rounded-md"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}