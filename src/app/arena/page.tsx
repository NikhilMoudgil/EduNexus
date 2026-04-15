import { Gamepad2 } from "lucide-react";
import ArenaClient from "@/components/arena/ArenaClient";

export default function ArenaPage() {
  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-28 pb-12 px-6">
      {/* Background Glowing Orbs */}
      <div className="fixed top-1/4 left-1/3 w-150 h-150 bg-fuchsia-900/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/3 w-125 h-125 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-10">
          <h1 className="text-4xl font-black flex items-center gap-4 tracking-tighter">
            <Gamepad2 className="w-8 h-8 text-fuchsia-400" />
            Dev Arena
          </h1>
          <p className="text-gray-400 mt-2 font-medium">
            Sharpen your technical interview skills under pressure. Play games, earn XP, and level up your profile.
          </p>
        </div>

        {/* Client Component */}
        <ArenaClient />
        
      </div>
    </div>
  );
}