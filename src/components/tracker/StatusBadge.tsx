const statusConfig = {
  BOOKMARKED: { label: 'Bookmarked', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
  SENT: { label: 'Applied', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  ASSESSMENT_PENDING: { label: 'Assessment', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
  INTERVIEWING: { label: 'Interviewing', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  OFFERED: { label: 'Offered', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  REJECTED: { label: 'Rejected', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  GHOSTED: { label: 'Ghosted', color: 'bg-slate-800 text-slate-500 border-slate-700' },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.SENT;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wide ${config.color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {config.label}
    </span>
  );
}