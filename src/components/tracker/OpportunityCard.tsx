import { Opportunity } from "@prisma/client";
import { ExternalLink, Globe, MapPin, Wallet, Clock } from "lucide-react";
import TrackButton from "./TrackButton";

const typeColors: Record<string, string> = {
  JOB: "bg-blue-500/20 text-blue-300",
  INTERNSHIP: "bg-teal-500/20 text-teal-300",
  HACKATHON: "bg-fuchsia-500/20 text-fuchsia-300",
  CASE_COMPETITION: "bg-orange-500/20 text-orange-300",
  OPEN_SOURCE: "bg-pink-500/20 text-pink-300",
};

function formatStipend(opp: Opportunity) {
  const { stipendMin: min, stipendMax: max, currency } = opp;
  if (min == null && max == null) return null;
  const fmt = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0,
  });
  // Assumption: internships are quoted per month, everything else per year
  const period = opp.type === "INTERNSHIP" ? "month" : "year";
  const range =
    min != null && max != null && min !== max
      ? `${fmt.format(min)} to ${fmt.format(max)}`
      : fmt.format((max ?? min) as number);
  return `${range} / ${period}`;
}

function timeAgo(date: Date) {
  const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60_000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days < 30 ? `${days}d ago` : new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function deadlineInfo(deadline: Date | null) {
  if (!deadline) return null;
  const ms = new Date(deadline).getTime() - Date.now();
  const days = Math.ceil(ms / 86_400_000);
  if (days <= 1) return { label: "Closes today", urgent: true };
  if (days <= 3) return { label: `Closes in ${days} days`, urgent: true };
  if (days <= 14) return { label: `Closes in ${days} days`, urgent: false };
  return {
    label: `Closes ${new Date(deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
    urgent: false,
  };
}

export default function OpportunityCard({ opp, tracked }: { opp: Opportunity; tracked: boolean }) {
  const stipend = formatStipend(opp);
  const deadline = deadlineInfo(opp.deadline);
  const place = opp.remote ? (opp.location ? `${opp.location} or remote` : "Remote") : opp.location;

  return (
    <article className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col hover:border-white/20 transition-colors">
      <div className="flex items-start gap-4">
        {opp.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={opp.logo}
            alt=""
            className="w-12 h-12 rounded-xl object-contain bg-white/5 border border-white/10 p-1.5 shrink-0"
          />
        ) : (
          <div
            aria-hidden
            className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-black text-lg flex items-center justify-center shrink-0"
          >
            {opp.company.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-white text-base leading-snug">{opp.title}</h3>
          <p className="text-sm text-gray-400 mt-0.5 truncate">{opp.company}</p>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider shrink-0 ${
            typeColors[opp.type] || "bg-gray-500/20 text-gray-300"
          }`}
        >
          {opp.type.replaceAll("_", " ")}
        </span>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-gray-300">
        {place && (
          <li className="flex items-center gap-2">
            {opp.remote ? (
              <Globe className="w-4 h-4 text-gray-500" />
            ) : (
              <MapPin className="w-4 h-4 text-gray-500" />
            )}
            {place}
          </li>
        )}
        {stipend && (
          <li className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-gray-500" />
            {stipend}
          </li>
        )}
        <li className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          Posted {timeAgo(opp.postedAt)}
        </li>
      </ul>

      {opp.tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mt-4">
          {opp.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
          {opp.tags.length > 4 && (
            <span className="text-[11px] text-gray-500 self-center">+{opp.tags.length - 4}</span>
          )}
        </div>
      )}

      <div className="mt-auto pt-6 flex items-center justify-between gap-3">
        {deadline ? (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              deadline.urgent
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
            }`}
          >
            {deadline.label}
          </span>
        ) : (
          <span className="text-xs text-gray-500">No deadline listed</span>
        )}

        <div className="flex items-center gap-2">
          <a
            href={opp.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Apply to ${opp.title} at ${opp.company} (opens in a new tab)`}
            className="p-2.5 rounded-xl text-cyan-500 hover:text-cyan-300 hover:bg-white/5 border border-white/10 transition"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <TrackButton opportunityId={opp.id} initiallyTracked={tracked} />
        </div>
      </div>
    </article>
  );
}
