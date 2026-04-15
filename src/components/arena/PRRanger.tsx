"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Heart, Play, RotateCcw, ArrowRight, GitCommit, CheckCircle, XCircle } from "lucide-react";

const prScenarios = [
  {
    id: 1,
    badComment: "This is terrible. Why didn't you just use a Map?",
    author: "junior_dev",
    options: [
      { text: "Use a Map here instead. It's much faster.", isConstructive: false },
      { text: "Consider using a Map here instead of an Array for O(1) lookups. What do you think?", isConstructive: true },
      { text: "I would never write it this way. A Map is better.", isConstructive: false },
    ],
    explanation: "Attack the problem, not the person. Suggesting the solution while asking 'What do you think?' builds collaboration and psychological safety."
  },
  {
    id: 2,
    badComment: "Fix this bug.",
    author: "frontend_ninja",
    options: [
      { text: "This function will throw an error if `userData` is null. Let's add optional chaining here.", isConstructive: true },
      { text: "You introduced a bug here. Fix it before merging.", isConstructive: false },
      { text: "Broken code here.", isConstructive: false },
    ],
    explanation: "Vague comments waste time. Always point out exactly *why* something is broken and, if possible, suggest the specific technical fix."
  },
  {
    id: 3,
    badComment: "You forgot to format the file AGAIN.",
    author: "intern_alex",
    options: [
      { text: "Format your files before pushing.", isConstructive: false },
      { text: "Why is the spacing all wrong here?", isConstructive: false },
      { text: "Looks like the linter didn't catch this file! Running `npm run lint:fix` should sort out the spacing.", isConstructive: true },
    ],
    explanation: "Avoid words like 'YOU did this wrong' (blame). Frame it around the tooling ('the linter didn't catch this') and provide the command to help them fix it quickly."
  }
];

export default function PRRanger() {
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "PAUSED" | "GAME_OVER">("IDLE");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState<{success: boolean, text: string} | null>(null);

  useEffect(() => {
    if (gameState !== "PLAYING") return;
    if (timeLeft <= 0) {
      handleReview(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setScore(0);
    setHealth(3);
    setCurrentScenario(0);
    setTimeLeft(20);
    setGameState("PLAYING");
  };

  const handleReview = (isConstructive: boolean) => {
    setGameState("PAUSED");
    if (isConstructive) {
      setScore(prev => prev + 200 + (timeLeft * 10));
      setFeedback({ success: true, text: "Excellent feedback! " + prScenarios[currentScenario].explanation });
    } else {
      setHealth(prev => prev - 1);
      setFeedback({ success: false, text: "Too harsh or vague! " + prScenarios[currentScenario].explanation });
    }
  };

  const nextRound = () => {
    if (health <= 0 || currentScenario >= prScenarios.length - 1) {
      setGameState("GAME_OVER");
    } else {
      setCurrentScenario(prev => prev + 1);
      setTimeLeft(20);
      setGameState("PLAYING");
    }
  };

  const currentData = prScenarios[currentScenario];

  return (
    <div className="bg-[#0a0a14] border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(249,115,22,0.15)] relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-orange-400 flex items-center gap-2">
          <MessageSquare className="w-6 h-6" /> PR Ranger
        </h3>
        
        {(gameState === "PLAYING" || gameState === "PAUSED") && (
          <div className="flex gap-4 items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-sm font-bold text-gray-400">Score: <span className="text-white">{score}</span></span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} className={`w-4 h-4 ${i < health ? 'text-orange-500 fill-orange-500' : 'text-gray-700'}`} />
              ))}
            </div>
            <span className={`text-sm font-bold ${timeLeft < 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>00:{timeLeft.toString().padStart(2, '0')}</span>
          </div>
        )}
      </div>

      {/* Game Area */}
      <div className="min-h-[350px] flex flex-col justify-center">
        
        {gameState === "IDLE" && (
          <div className="text-center space-y-4">
            <MessageSquare className="w-16 h-16 text-orange-500 mx-auto opacity-50" />
            <p className="text-gray-400 max-w-md mx-auto">Engineering is communication. Rewrite toxic or vague pull request comments into constructive, collaborative feedback.</p>
            <button onClick={startGame} className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto">
              <Play className="w-5 h-5" /> Start Code Review
            </button>
          </div>
        )}

        {gameState === "PLAYING" && (
          <div className="space-y-6 animate-in fade-in">
            {/* The Mock GitHub PR Interface */}
            <div className="bg-[#0d1117] border border-gray-700 p-4 rounded-xl shadow-inner">
              <div className="flex items-center gap-2 mb-3 border-b border-gray-700 pb-2">
                <GitCommit className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm font-mono">Changes proposed by <span className="text-blue-400 font-bold">@{currentData.author}</span></span>
              </div>
              <div className="bg-red-900/20 border-l-4 border-red-500 p-3 rounded-r-lg">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">Toxic Comment Detected:</span>
                <p className="text-gray-300 font-medium">"{currentData.badComment}"</p>
              </div>
            </div>

            {/* The Options */}
            <div className="space-y-3">
              <span className="text-sm font-bold text-gray-500 ml-1">Select the best rewrite:</span>
              {currentData.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleReview(opt.isConstructive)}
                  className="w-full text-left bg-white/5 border border-white/10 hover:border-orange-500 p-4 rounded-xl text-sm text-gray-300 transition hover:bg-orange-500/10 group flex justify-between items-center"
                >
                  <span className="leading-relaxed pr-4">{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-400 shrink-0 transition" />
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === "PAUSED" && feedback && (
          <div className="space-y-6 animate-in zoom-in-95">
            <div className={`p-6 rounded-2xl border ${feedback.success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <h4 className={`text-xl font-black mb-2 flex items-center gap-2 ${feedback.success ? 'text-green-400' : 'text-red-400'}`}>
                {feedback.success ? <CheckCircle /> : <XCircle />}
                {feedback.success ? "Approved & Constructive!" : "Changes Requested"}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">{feedback.text}</p>
            </div>
            <button onClick={nextRound} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
              Next Pull Request <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="text-center space-y-4 animate-in zoom-in">
            <CheckCircle className="w-16 h-16 text-orange-400 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-white">Review Complete</h4>
            <p className="text-gray-400">Your team appreciates your professionalism!</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block mx-auto min-w-[200px]">
              <p className="text-gray-400 text-sm mb-1">Final Score</p>
              <p className="text-orange-400 font-black text-4xl">{score}</p>
            </div>
            <button onClick={startGame} className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto mt-6">
              <RotateCcw className="w-5 h-5" /> Start Another Shift
            </button>
          </div>
        )}

      </div>
    </div>
  );
}