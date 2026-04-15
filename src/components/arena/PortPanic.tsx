"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw, ShieldAlert, Server, Activity, ArrowRight, ShieldCheck, XOctagon } from "lucide-react";

// The Static Database of Protocols
const protocolData = [
  { name: "HTTP", port: 80, desc: "Unencrypted web traffic" },
  { name: "HTTPS", port: 443, desc: "Secure web traffic" },
  { name: "SSH", port: 22, desc: "Secure shell access" },
  { name: "FTP", port: 21, desc: "File transfer protocol" },
  { name: "DNS", port: 53, desc: "Domain name system" },
  { name: "SMTP", port: 25, desc: "Email routing" },
  { name: "PostgreSQL", port: 5432, desc: "Database connection" },
  { name: "MySQL", port: 3306, desc: "Database connection" },
  { name: "Redis", port: 6379, desc: "In-memory datastore" },
];

// Display options to make it tricky
const allPorts = [21, 22, 25, 53, 80, 443, 3306, 5432, 6379, 8080];

export default function PortPanic() {
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "PAUSED" | "GAME_OVER">("IDLE");
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [streak, setStreak] = useState(0);
  
  const [currentPacket, setCurrentPacket] = useState<any>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds per packet! Fast paced!
  
  const [feedback, setFeedback] = useState<{success: boolean, text: string} | null>(null);

  // Timer Logic
  useEffect(() => {
    if (gameState !== "PLAYING") return;
    if (timeLeft <= 0) {
      handleMiss("Timeout!");
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const generateRound = () => {
    const packet = protocolData[Math.floor(Math.random() * protocolData.length)];
    setCurrentPacket(packet);
    
    // Generate 3 wrong options + 1 right option
    let choices = new Set<number>();
    choices.add(packet.port);
    while (choices.size < 4) {
      choices.add(allPorts[Math.floor(Math.random() * allPorts.length)]);
    }
    setOptions(Array.from(choices).sort(() => Math.random() - 0.5));
    setTimeLeft(5); // 5 seconds to route it!
  };

  const startGame = () => {
    setScore(0);
    setHealth(3);
    setStreak(0);
    setGameState("PLAYING");
    generateRound();
  };

  const handleRoute = (selectedPort: number) => {
    if (selectedPort === currentPacket.port) {
      // Hit!
      setScore(prev => prev + 100 + (streak * 20));
      setStreak(prev => prev + 1);
      generateRound(); // Instantly next packet (flow state)
    } else {
      // Miss!
      handleMiss(`Wrong port! ${currentPacket.name} uses Port ${currentPacket.port}.`);
    }
  };

  const handleMiss = (reason: string) => {
    const newHealth = health - 1;
    setHealth(newHealth);
    setStreak(0);
    setGameState("PAUSED");
    setFeedback({
      success: false,
      text: `${reason} ${currentPacket.desc}.`
    });

    if (newHealth <= 0) {
      setTimeout(() => setGameState("GAME_OVER"), 2000);
    }
  };

  const resumeGame = () => {
    setGameState("PLAYING");
    generateRound();
  };

  return (
    <div className="bg-[#0a0a14] border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden group">
      {/* Server Rack Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 flex items-center gap-2">
          <Server className="w-5 h-5 text-green-400" />
          Port Panic
        </h3>
        
        {(gameState === "PLAYING" || gameState === "PAUSED") && (
          <div className="flex gap-4 items-center bg-black/40 px-4 py-2 rounded-xl border border-white/5">
            <span className="text-sm font-bold text-gray-400">Score: <span className="text-white">{score}</span></span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <ShieldAlert key={i} className={`w-4 h-4 ${i < health ? 'text-green-500' : 'text-gray-700'}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="min-h-[280px] flex flex-col justify-center relative z-10">
        {gameState === "IDLE" && (
          <div className="text-center space-y-4 animate-in fade-in">
            <p className="text-gray-400">Route the incoming protocols to the correct server ports before the firewall drops them!</p>
            <button onClick={startGame} className="bg-green-500 hover:bg-green-400 text-black font-black px-8 py-3 rounded-xl transition shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center gap-2 mx-auto">
              <Play className="w-5 h-5" /> Initialize Server
            </button>
          </div>
        )}

        {gameState === "PLAYING" && currentPacket && (
          <div className="space-y-8 animate-in zoom-in-95 duration-200">
            {/* Incoming Packet */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 animate-pulse">Incoming Packet</span>
              <div className="bg-green-500/10 border border-green-500/30 px-10 py-6 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <h2 className="text-4xl font-black text-white tracking-wider flex items-center gap-3">
                  <Activity className="w-8 h-8 text-green-400" />
                  {currentPacket.name}
                </h2>
              </div>
              
              {/* Stress Timer Bar */}
              <div className="w-full max-w-xs mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 2 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${(timeLeft / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Port Routing Buttons */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {options.map((port) => (
                <button 
                  key={port}
                  onClick={() => handleRoute(port)}
                  className="bg-[#0a0a14] border border-white/10 hover:border-green-500 hover:bg-green-500/10 text-white font-bold py-4 rounded-xl transition hover:-translate-y-1 active:translate-y-0 text-xl flex justify-center items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-green-400 transition" />
                  {port}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === "PAUSED" && feedback && (
          <div className="text-center space-y-6 animate-in slide-in-from-bottom-4">
            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl inline-block max-w-sm">
              <XOctagon className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-red-400 mb-1">Firewall Blocked!</h4>
              <p className="text-gray-300 text-sm">{feedback.text}</p>
            </div>
            
            {health > 0 && (
              <button onClick={resumeGame} className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto">
                Next Packet <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="text-center space-y-4 animate-in zoom-in duration-300">
            <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-white">System Offline</h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block mx-auto min-w-[200px]">
              <p className="text-gray-400 text-sm mb-1">Total Packets Routed</p>
              <p className="text-green-400 font-black text-4xl">{score}</p>
            </div>
            <button onClick={startGame} className="bg-green-500 hover:bg-green-400 text-black font-black px-8 py-3 rounded-xl transition shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center gap-2 mx-auto mt-6">
              <RotateCcw className="w-5 h-5" /> Reboot Server
            </button>
          </div>
        )}
      </div>
    </div>
  );
}