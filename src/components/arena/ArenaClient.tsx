"use client";

import { useState } from "react";
import { BrainCircuit, Code2, Database, MessageSquare, Network, Play, Star } from "lucide-react";
import BigOBlitz from "./BigOBlitz";
import PortPanic from "./PortPanic";
import SQLSniper from "./SQLSniper";
import PRRanger from "./PRRanger";
import STARMaestro from "./STARMaestro";
import RegexRush from "./RegexRush";

export default function ArenaClient() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // ---------------------------------------------------------
  // 🎮 GAME ROUTER: Renders the selected game
  // ---------------------------------------------------------
  
  const renderGame = () => {
    switch (activeGame) {
      case "big-o": return <BigOBlitz />;
      case "port-panic": return <PortPanic />;
      case "sql-sniper": return <SQLSniper />;
      case "pr-ranger": return <PRRanger />;
      case "star-maestro": return <STARMaestro />;
      case "regex-rush": return <RegexRush />;
      default: return null;
    }
  };

  if (activeGame) {
    return (
      <div className="animate-in fade-in zoom-in duration-300">
        <button 
          onClick={() => setActiveGame(null)}
          className="mb-6 text-gray-400 hover:text-white flex items-center gap-2 font-bold transition"
        >
          ← Back to Arena Hub
        </button>
        {renderGame()}
      </div>
    );
  }

  // ---------------------------------------------------------
  // 🏠 ARENA HUB: The main dashboard
  // ---------------------------------------------------------

  return (
    <div className="space-y-8">
      
      {/* 📊 Player Stats Bar */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-wrap gap-8 items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-fuchsia-500 flex items-center justify-center bg-black/50 font-black text-xl shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            Lvl 4
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Your Tech Rating</h3>
            <p className="text-sm text-gray-400">1,250 XP to Next Level</p>
          </div>
        </div>
        
        {/* Expanded to 4 columns to include Communication */}
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
          <SkillBar title="Algorithms" progress={65} color="bg-fuchsia-500" />
          <SkillBar title="Networks" progress={40} color="bg-green-500" />
          <SkillBar title="Databases" progress={25} color="bg-blue-500" />
          <SkillBar title="Communication" progress={15} color="bg-orange-500" />
        </div>
      </div>

      {/* 🕹️ Game Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Game 1: Big-O Blitz */}
        <GameCard 
          title="Big-O Blitz" 
          desc="Master Time & Space complexity. Identify the efficiency of code snippets under pressure."
          icon={<BrainCircuit className="w-8 h-8 text-fuchsia-400" />}
          colorClass="fuchsia"
          onClick={() => setActiveGame("big-o")}
        />

        {/* Game 2: Port Panic */}
        <GameCard 
          title="Port Panic" 
          desc="Route incoming server traffic to the correct network ports before the firewall drops them."
          icon={<Network className="w-8 h-8 text-green-400" />}
          colorClass="green"
          onClick={() => setActiveGame("port-panic")}
        />

        {/* Game 3: SQL Sniper */}
        <GameCard 
          title="SQL Sniper" 
          desc="Identify SQL injection vulnerabilities and write secure queries to defend the database."
          icon={<Database className="w-8 h-8 text-blue-400" />}
          colorClass="blue"
          onClick={() => setActiveGame("sql-sniper")}
        />

        {/* Game 4: PR Ranger */}
        <GameCard 
          title="PR Ranger" 
          desc="Rewrite toxic pull request comments into constructive, professional engineering feedback."
          icon={<MessageSquare className="w-8 h-8 text-orange-400" />}
          colorClass="orange"
          onClick={() => setActiveGame("pr-ranger")}
        />

        {/* Game 5: STAR Maestro */}
        <GameCard 
          title="STAR Maestro" 
          desc="Construct perfect behavioral interview answers using the Situation, Task, Action, Result framework."
          icon={<Star className="w-8 h-8 text-yellow-400" />}
          colorClass="yellow"
          onClick={() => setActiveGame("star-maestro")}
        />

        {/* Game 6: Regex Rush */}
        <GameCard 
          title="Regex Rush" 
          desc="Write regular expressions on the fly to validate inputs and filter out malicious strings."
          icon={<Code2 className="w-8 h-8 text-pink-400" />}
          colorClass="pink"
          onClick={() => setActiveGame("regex-rush")}
        />

      </div>
    </div>
  );
}

// ---------------------------------------------------------
// 🧩 UI COMPONENTS
// ---------------------------------------------------------

function GameCard({ title, desc, icon, colorClass, onClick }: { title: string, desc: string, icon: React.ReactNode, colorClass: string, onClick: () => void }) {
  // ✅ FIXED: Added orange, yellow, and pink mappings here!
  const colorMap: Record<string, string> = {
    fuchsia: "hover:shadow-fuchsia-500/10 text-fuchsia-300 bg-fuchsia-500/20 group-hover:bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.1)]",
    green: "hover:shadow-green-500/10 text-green-300 bg-green-500/20 group-hover:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]",
    blue: "hover:shadow-blue-500/10 text-blue-300 bg-blue-500/20 group-hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    orange: "hover:shadow-orange-500/10 text-orange-300 bg-orange-500/20 group-hover:bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.1)]",
    yellow: "hover:shadow-yellow-500/10 text-yellow-300 bg-yellow-500/20 group-hover:bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    pink: "hover:shadow-pink-500/10 text-pink-300 bg-pink-500/20 group-hover:bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.1)]",
  };

  const bgMap: Record<string, string> = {
    fuchsia: "bg-fuchsia-500/20", green: "bg-green-500/20", blue: "bg-blue-500/20",
    orange: "bg-orange-500/20", yellow: "bg-yellow-500/20", pink: "bg-pink-500/20"
  };

  return (
    <div 
      className={`bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition group cursor-pointer shadow-lg`} 
      onClick={onClick}
    >
      <div className={`p-4 ${bgMap[colorClass] || "bg-gray-500/20"} rounded-2xl w-fit mb-4 group-hover:scale-110 transition duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 h-10">{desc}</p>
      <button className={`w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 group-hover:text-white transition ${colorMap[colorClass] || "text-gray-300 bg-gray-500/20"}`}>
        <Play className="w-4 h-4" /> Start Training
      </button>
    </div>
  );
}

function SkillBar({ title, progress, color }: { title: string, progress: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-1">
        <span className="text-gray-400">{title}</span>
        <span className="text-white">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}