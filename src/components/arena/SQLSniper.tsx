"use client";

import { useState, useEffect } from "react";
import { Crosshair, Shield, AlertTriangle, Play, RotateCcw, ShieldCheck, ArrowRight, Database } from "lucide-react";

const sniperScenarios = [
  {
    id: 1,
    title: "User Authentication",
    mission: "Find the secure query to log a user in without allowing SQL Injection.",
    options: [
      { code: "SELECT * FROM users WHERE email = '" + "req.body.email" + "'", isSecure: false },
      { code: "SELECT * FROM users WHERE email = ${req.body.email}", isSecure: false },
      { code: "prisma.user.findUnique({ where: { email: req.body.email } })", isSecure: true },
    ],
    explanation: "String concatenation and raw template literals allow attackers to inject malicious SQL (like ' OR 1=1 --). Prisma's built-in ORM methods automatically sanitize inputs."
  },
  {
    id: 2,
    title: "Public Profile Fetch",
    mission: "Fetch a user's profile data safely without leaking sensitive information.",
    options: [
      { code: "prisma.user.findUnique({ where: { id: userId } })", isSecure: false },
      { code: "SELECT id, name, avatar FROM users WHERE id = ?", isSecure: true },
      { code: "prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`", isSecure: false },
    ],
    explanation: "Never use 'SELECT *' or fetch the whole Prisma object for a public profile! It will leak passwords, tokens, or email addresses to the frontend. Always select only the specific columns you need."
  },
  {
    id: 3,
    title: "Bulk Update Permissions",
    mission: "Update user roles securely using raw SQL.",
    options: [
      { code: "db.query(`UPDATE users SET role = 'admin' WHERE id IN (${ids.join(',')})`)", isSecure: false },
      { code: "db.query('UPDATE users SET role = $1 WHERE id = ANY($2)', ['admin', ids])", isSecure: true },
      { code: "db.query('UPDATE users SET role = ? WHERE id = ' + userId, ['admin'])", isSecure: false },
    ],
    explanation: "Joining arrays directly into a SQL string is a massive vulnerability. You must use parameterized queries (like $1, $2 or ?) to ensure the database treats the input as data, not executable code."
  }
];

export default function SQLSniper() {
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "PAUSED" | "GAME_OVER">("IDLE");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [timeLeft, setTimeLeft] = useState(15);
  const [feedback, setFeedback] = useState<{success: boolean, text: string} | null>(null);

  useEffect(() => {
    if (gameState !== "PLAYING") return;
    if (timeLeft <= 0) {
      handleShot(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setScore(0);
    setHealth(3);
    setCurrentScenario(0);
    setTimeLeft(15);
    setGameState("PLAYING");
  };

  const handleShot = (isSecure: boolean) => {
    setGameState("PAUSED");
    if (isSecure) {
      setScore(prev => prev + 250 + (timeLeft * 10));
      setFeedback({ success: true, text: sniperScenarios[currentScenario].explanation });
    } else {
      setHealth(prev => prev - 1);
      setFeedback({ success: false, text: "Data Breach! " + sniperScenarios[currentScenario].explanation });
    }
  };

  const nextRound = () => {
    if (health <= 0 || currentScenario >= sniperScenarios.length - 1) {
      setGameState("GAME_OVER");
    } else {
      setCurrentScenario(prev => prev + 1);
      setTimeLeft(15);
      setGameState("PLAYING");
    }
  };

  const currentData = sniperScenarios[currentScenario];

  return (
    <div className="bg-[#0a0a14] border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-blue-400 flex items-center gap-2">
          <Crosshair className="w-6 h-6" /> SQL Sniper
        </h3>
        
        {(gameState === "PLAYING" || gameState === "PAUSED") && (
          <div className="flex gap-4 items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-sm font-bold text-gray-400">Score: <span className="text-white">{score}</span></span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Shield key={i} className={`w-4 h-4 ${i < health ? 'text-blue-500' : 'text-gray-700'}`} />
              ))}
            </div>
            <span className={`text-sm font-bold ${timeLeft < 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>00:{timeLeft.toString().padStart(2, '0')}</span>
          </div>
        )}
      </div>

      <div className="min-h-[350px] flex flex-col justify-center">
        {gameState === "IDLE" && (
          <div className="text-center space-y-4">
            <Database className="w-16 h-16 text-blue-500 mx-auto opacity-50" />
            <p className="text-gray-400">Identify the secure query and eliminate the vulnerabilities to protect the database.</p>
            <button onClick={startGame} className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto">
              <Play className="w-5 h-5" /> Start Mission
            </button>
          </div>
        )}

        {gameState === "PLAYING" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl">
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-wider mb-1">Target: {currentData.title}</h4>
              <p className="text-white font-medium">{currentData.mission}</p>
            </div>

            <div className="space-y-3">
              {currentData.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleShot(opt.isSecure)}
                  className="w-full text-left bg-black/50 border border-white/10 hover:border-blue-500 p-4 rounded-xl font-mono text-sm text-gray-300 transition hover:bg-blue-900/10 group flex justify-between items-center"
                >
                  <code>{opt.code}</code>
                  <Crosshair className="w-5 h-5 text-gray-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition" />
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === "PAUSED" && feedback && (
          <div className="space-y-6 animate-in zoom-in-95">
            <div className={`p-6 rounded-2xl border ${feedback.success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <h4 className={`text-xl font-black mb-2 flex items-center gap-2 ${feedback.success ? 'text-green-400' : 'text-red-400'}`}>
                {feedback.success ? <ShieldCheck /> : <AlertTriangle />}
                {feedback.success ? "Database Secured" : "Vulnerability Exploited"}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">{feedback.text}</p>
            </div>
            <button onClick={nextRound} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
              Continue Mission <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="text-center space-y-4 animate-in zoom-in">
            <ShieldCheck className="w-16 h-16 text-blue-400 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-white">Mission Accomplished</h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block mx-auto min-w-[200px]">
              <p className="text-gray-400 text-sm mb-1">Final Score</p>
              <p className="text-blue-400 font-black text-4xl">{score}</p>
            </div>
            <button onClick={startGame} className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto mt-6">
              <RotateCcw className="w-5 h-5" /> Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}