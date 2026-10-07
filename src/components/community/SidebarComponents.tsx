import { Check, Ban } from "lucide-react";
import { card, label } from "./ui";

const Heading = ({ children, color = "#00d9ff" }: { children: string; color?: string }) => (
  <h2 className={`${label} mb-4 flex items-center gap-2 uppercase`}>
    <i className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
    {children}
  </h2>
);

export function LeftSidebar() {
  return (
    <aside className="space-y-6">
      <section className={`${card} p-5`}>
        <Heading color="#22c55e">Community guidelines</Heading>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-center gap-2"><Check size={16} className="text-green-400" aria-hidden />Respect all members</li>
          <li className="flex items-center gap-2"><Check size={16} className="text-green-400" aria-hidden />Share verified tech tips</li>
          <li className="flex items-center gap-2"><Ban size={16} className="text-red-400" aria-hidden />No spam or promo</li>
        </ul>
      </section>

      <section className={`${card} p-5`}>
        <Heading color="#d946ef">Top mentors</Heading>
        <ul className="space-y-4">
          {["Dr. Sarah Chen", "Mark Williams", "Priya Patel"].map((mentor) => (
            <li key={mentor} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-bold text-cyan-300">{mentor[0]}</div>
              <div>
                <p className="text-sm font-bold text-white">{mentor}</p>
                <p className="text-xs text-gray-500">Verified expert</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

export function RightSidebar() {
  return (
    <aside className="space-y-6">
      <section className={`${card} p-5`}>
        <Heading color="#f5b942">Upcoming events</Heading>
        <ul className="space-y-4">
          {[
            { date: "15 JUN", title: "Web3 Hackathon", type: "Virtual" },
            { date: "22 JUN", title: "AI Panel Discussion", type: "In-Person" },
          ].map((ev) => (
            <li key={ev.title} className="flex gap-4">
              <div className="min-w-[52px] rounded-xl border border-blue-500/30 bg-blue-600/15 p-2 text-center">
                <p className="text-sm font-black leading-none text-blue-300">{ev.date.split(" ")[0]}</p>
                <p className="mt-1 font-mono text-[10px] text-blue-300/80">{ev.date.split(" ")[1]}</p>
              </div>
              <div className="self-center">
                <p className="text-sm font-bold text-white">{ev.title}</p>
                <p className="text-xs text-gray-500">{ev.type}</p>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-5 w-full rounded-full border border-white/15 py-2 text-xs font-bold text-white transition hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
          View all events
        </button>
      </section>

      <section className={`${card} p-5`}>
        <Heading>Popular tags</Heading>
        <ul className="flex flex-wrap gap-2">
          {["#AI", "#Blockchain", "#NextJS", "#Cloud", "#DevOps"].map((tag) => (
            <li key={tag} className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-400 transition hover:border-cyan-400/50 hover:text-cyan-300">
              {tag}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
