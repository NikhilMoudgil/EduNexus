"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List as ListIcon, Download, Plus, Briefcase, Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import AddApplicationModal from "./AddApplicationModal";
import KanbanBoard from "./KanbanBoard";
import ApplicationList from "./ApplicationList";

export default function DashboardClient({ initialApplications }) {
  const [applications, setApplications] = useState(initialApplications);
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Exact metrics from your schema enums
  const metrics = useMemo(() => {
    const total = applications.length;
    const active = applications.filter(a => !['REJECTED', 'GHOSTED', 'OFFERED'].includes(a.status)).length;
    const offers = applications.filter(a => a.status === 'OFFERED').length;
    
    const now = new Date();
    const upcomingInterviews = applications.flatMap(app => app.rounds)
      .filter(round => round.date && new Date(round.date) > now).length;

    return { total, active, offers, upcomingInterviews };
  }, [applications]);

  // "What's Next?" strictly from your 'rounds' and 'deadline' fields
  const nextAction = useMemo(() => {
    const now = new Date();
    let nearestInterview = null;

    applications.forEach(app => {
      app.rounds?.forEach(round => {
        if (round.date && new Date(round.date) > now) {
          if (!nearestInterview || new Date(round.date) < new Date(nearestInterview.date)) {
            nearestInterview = { ...round, company: app.company };
          }
        }
      });
    });

    if (nearestInterview) {
      return `Upcoming Interview: ${nearestInterview.title} at ${nearestInterview.company} on ${new Date(nearestInterview.date).toLocaleDateString()}`;
    }

    const upcomingDeadlines = applications
      .filter(a => a.deadline && new Date(a.deadline) > now)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

    if (upcomingDeadlines.length > 0) {
      return `Deadline approaching: Submit ${upcomingDeadlines[0].company} by ${new Date(upcomingDeadlines[0].deadline).toLocaleDateString()}`;
    }

    return "You're all caught up. Keep your applications moving!";
  }, [applications]);

  const filteredApplications = applications.filter(app => 
    app.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
    app.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Company,Role,Type,Status,Date Applied,Link\n"
      + applications.map(a => `${a.company},${a.role},${a.type},${a.status},${new Date(a.dateApplied).toLocaleDateString()},${a.link || ''}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "edunexus_placements.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Command Center Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Tracked", value: metrics.total, icon: Briefcase, color: "text-blue-400" },
          { label: "Active Pipeline", value: metrics.active, icon: Clock, color: "text-amber-400" },
          { label: "Upcoming Rounds", value: metrics.upcomingInterviews, icon: Calendar, color: "text-cyan-400" },
          { label: "Offers", value: metrics.offers, icon: CheckCircle2, color: "text-emerald-400" },
        ].map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
              <stat.icon className={`w-5 h-5 ${stat.color} opacity-80`} />
            </div>
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Action Banner */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-cyan-950/40 to-blue-900/10 border border-cyan-900/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3"
      >
        <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 hidden md:block" />
        <div>
          <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">What's Next?</h3>
          <p className="text-sm text-cyan-100">{nextAction}</p>
        </div>
      </motion.div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/30 p-2 rounded-xl border border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search company or role..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder:text-slate-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex bg-slate-950/50 rounded-lg border border-slate-800 p-1">
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}><ListIcon className="w-4 h-4" /></button>
            <button onClick={() => setViewMode("board")} className={`p-1.5 rounded-md transition-colors ${viewMode === 'board' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}><LayoutGrid className="w-4 h-4" /></button>
          </div>
          <button onClick={exportData} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-700 hover:bg-slate-700 rounded-lg transition-colors"><Download className="w-4 h-4" /><span className="hidden sm:inline">Export</span></button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors ml-auto md:ml-0"><Plus className="w-4 h-4" /><span>Add Application</span></button>
        </div>
      </div>

      {/* Main Workspace */}
      <AnimatePresence mode="wait">
        {applications.length === 0 ? (
          <EmptyState key="empty" onAdd={() => setIsModalOpen(true)} />
        ) : viewMode === "board" ? (
          <KanbanBoard key="board" applications={filteredApplications} />
        ) : (
          <ApplicationList key="list" applications={filteredApplications} />
        )}
      </AnimatePresence>

      <AddApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
      <div className="w-16 h-16 bg-cyan-950/50 rounded-2xl flex items-center justify-center mb-6 border border-cyan-900/30">
        <Briefcase className="w-8 h-8 text-cyan-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">Your journey starts here.</h3>
      <p className="text-slate-400 max-w-md mb-8 text-sm">Track every application, OA, and interview. Stop losing links and forgetting deadlines.</p>
      <button onClick={onAdd} className="px-6 py-2.5 bg-white text-slate-900 hover:bg-slate-200 font-semibold rounded-lg transition-colors text-sm">Add your first application</button>
    </motion.div>
  );
}