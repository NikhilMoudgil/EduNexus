import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";
import { Calendar, Code } from "lucide-react";

// Matches schema ApplicationStatus logic order
const COLUMNS = ['BOOKMARKED', 'SENT', 'ASSESSMENT_PENDING', 'INTERVIEWING', 'OFFERED'];

export default function KanbanBoard({ applications }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar">
      {COLUMNS.map((colStatus) => {
        const columnApps = applications.filter(a => a.status === colStatus);
        
        return (
          <div key={colStatus} className="flex-shrink-0 w-80 bg-slate-900/30 border border-slate-800/60 rounded-xl flex flex-col snap-center h-[65vh]">
            <div className="p-3 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/50 rounded-t-xl">
              <StatusBadge status={colStatus} />
              <span className="text-xs font-medium text-slate-500">{columnApps.length}</span>
            </div>
            
            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              {columnApps.map((app) => (
                <motion.div key={app.id} layoutId={`card-${app.id}`} className="bg-slate-950/80 border border-slate-800 p-4 rounded-lg hover:border-slate-600 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">{app.company}</h4>
                    {app.type === 'HACKATHON' && <Code className="w-3 h-3 text-violet-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{app.role}</p>
                  
                  {app.deadline && (
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-400/80 bg-amber-400/10 px-2 py-1 rounded w-fit">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {new Date(app.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </motion.div>
              ))}
              {columnApps.length === 0 && (
                <div className="h-full flex items-center justify-center text-xs text-slate-600 italic">Drop here</div>
              )}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}