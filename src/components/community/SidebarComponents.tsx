import { ShieldCheck, Calendar, TrendingUp } from "lucide-react";

export function LeftSidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Community Guidelines</h3>
        <ul className="space-y-3 text-xs text-gray-400 font-medium">
          <li className="flex gap-2">✅ <span className="text-green-400/80">Respect all members</span></li>
          <li className="flex gap-2">✅ <span className="text-green-400/80">Share verified tech tips</span></li>
          <li className="flex gap-2">🚫 <span className="text-red-400/80">No spam or promo</span></li>
        </ul>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Top Mentors</h3>
        <div className="space-y-4">
          {["Dr. Sarah Chen", "Mark Williams", "Priya Patel"].map((mentor) => (
            <div key={mentor} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold text-cyan-400 text-xs">
                {mentor[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{mentor}</p>
                <p className="text-[10px] text-gray-500">Verified Expert</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function RightSidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Upcoming Events</h3>
        <div className="space-y-4">
          {[
            { date: "15 JUN", title: "Web3 Hackathon", type: "Virtual" },
            { date: "22 JUN", title: "AI Panel Discussion", type: "In-Person" }
          ].map((ev) => (
            <div key={ev.title} className="flex gap-4">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-2 text-center min-w-[50px]">
                <p className="text-[10px] font-bold text-blue-400">{ev.date.split(' ')[0]}</p>
                <p className="text-[8px] font-medium text-blue-400">{ev.date.split(' ')[1]}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white">{ev.title}</p>
                <p className="text-[10px] text-gray-500">{ev.type}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition">
          View All Events
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["#AI", "#Blockchain", "#NextJS", "#Cloud", "#DevOps"].map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 hover:text-cyan-400 cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}