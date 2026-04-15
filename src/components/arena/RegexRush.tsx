"use client";

import { useState, useEffect } from "react";
import { Code2, Play, RotateCcw, ArrowRight, Heart, Timer, CheckCircle2, XCircle, Terminal } from "lucide-react";

const regexLevels = [
  {
    id: 1,
    title: "The Number Cruncher",
    mission: "Write a pattern that matches exact 3-digit numbers.",
    valid: ["123", "999", "000"],
    invalid: ["12", "1234", "abc", "12a"],
    hint: "^\\d{3}$ or ^[0-9]{3}$",
    explanation: "The ^ anchor means 'start', \\d means 'digit', {3} means 'exactly three times', and $ means 'end'."
  },
  {
    id: 2,
    title: "Hex Hunter",
    mission: "Match valid 6-character hex color codes starting with #.",
    valid: ["#FF0011", "#abcdef", "#000000"],
    invalid: ["#FF0", "#GG0011", "FF0011", "#abcd"],
    hint: "^#[a-fA-F0-9]{6}$",
    explanation: "Character classes like [a-fA-F0-9] allow you to restrict matches to specific ranges of letters and numbers."
  },
  {
    id: 3,
    title: "File Extension Filter",
    mission: "Match only image files (.jpg, .png, or .gif).",
    valid: ["image.jpg", "banner.png", "meme.gif"],
    invalid: ["script.js", "style.css", "image.jpeg", "doc.pdf"],
    hint: "\\.(jpg|png|gif)$",
    explanation: "The \\. escapes the dot (so it means a literal dot), and (a|b) is a capture group with an 'OR' condition."
  }
];

export default function RegexRush() {
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "LEVEL_CLEARED" | "GAME_OVER">("IDLE");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [timeLeft, setTimeLeft] = useState(45);
  
  const [userRegex, setUserRegex] = useState("");
  const [isRegexValid, setIsRegexValid] = useState(true);

  // Timer logic
  useEffect(() => {
    if (gameState !== "PLAYING") return;
    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setScore(0);
    setHealth(3);
    setCurrentLevel(0);
    setUserRegex("");
    setTimeLeft(45);
    setGameState("PLAYING");
  };

  const handleTimeOut = () => {
    setHealth(prev => prev - 1);
    if (health - 1 <= 0) {
      setGameState("GAME_OVER");
    } else {
      setTimeLeft(45); // Reset timer but lose a life
      setUserRegex("");
    }
  };

  const nextLevel = () => {
    if (currentLevel >= regexLevels.length - 1) {
      setGameState("GAME_OVER");
    } else {
      setCurrentLevel(prev => prev + 1);
      setUserRegex("");
      setTimeLeft(45);
      setGameState("PLAYING");
    }
  };

  const levelData = regexLevels[currentLevel];

  // Real-time Regex Evaluation
  let compiledRegex: RegExp | null = null;
  let matchesAllValid = false;
  let rejectsAllInvalid = false;

  try {
    // Only compile if there is input, otherwise it matches everything
    if (userRegex.trim() !== "") {
      compiledRegex = new RegExp(userRegex);
      matchesAllValid = levelData.valid.every(str => compiledRegex?.test(str));
      rejectsAllInvalid = levelData.invalid.every(str => !compiledRegex?.test(str));
    }
  } catch (e) {
    // Invalid regex syntax (e.g., unmatched parentheses)
    compiledRegex = null;
  }

  // Auto-complete level when they get it right
  useEffect(() => {
    if (gameState === "PLAYING" && matchesAllValid && rejectsAllInvalid) {
      setScore(prev => prev + 300 + (timeLeft * 10));
      setGameState("LEVEL_CLEARED");
    }
  }, [matchesAllValid, rejectsAllInvalid, gameState, timeLeft]);

  return (
    <div className="bg-[#0a0a14] border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-pink-400 flex items-center gap-2">
          <Code2 className="w-6 h-6" /> Regex Rush
        </h3>
        
        {(gameState === "PLAYING" || gameState === "LEVEL_CLEARED") && (
          <div className="flex gap-4 items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-sm font-bold text-gray-400">Score: <span className="text-white">{score}</span></span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} className={`w-4 h-4 ${i < health ? 'text-pink-500 fill-pink-500' : 'text-gray-700'}`} />
              ))}
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${timeLeft < 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              <Timer className="w-4 h-4" /> 00:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>
        )}
      </div>

      {/* Game Area */}
      <div className="min-h-[400px] flex flex-col justify-center">
        
        {gameState === "IDLE" && (
          <div className="text-center space-y-4">
            <Terminal className="w-16 h-16 text-pink-500 mx-auto opacity-50" />
            <p className="text-gray-400 max-w-md mx-auto">Write Regular Expressions on the fly. Match the target data and reject the corrupt data before the timer hits zero.</p>
            <button onClick={startGame} className="bg-pink-600 hover:bg-pink-500 text-white font-black px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto">
              <Play className="w-5 h-5" /> Initialize Terminal
            </button>
          </div>
        )}

        {gameState === "PLAYING" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Level Instructions */}
            <div className="bg-pink-900/20 border border-pink-500/30 p-4 rounded-xl text-center">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block mb-1">Level {currentLevel + 1}: {levelData.title}</span>
              <p className="text-white font-medium text-lg">{levelData.mission}</p>
            </div>

            {/* The Regex Input */}
            <div className="flex items-center gap-3 bg-[#0d1117] border-2 border-gray-700 focus-within:border-pink-500 p-4 rounded-xl transition shadow-inner">
              <span className="text-pink-500 text-2xl font-black">/</span>
              <input 
                type="text" 
                value={userRegex}
                onChange={(e) => setUserRegex(e.target.value)}
                placeholder="Type your regex here..."
                className="bg-transparent border-none outline-none text-white font-mono text-xl w-full"
                autoFocus
              />
              <span className="text-pink-500 text-2xl font-black">/</span>
            </div>

            {/* Target vs Corrupt Data Validation Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Valid Data Column */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Must Match
                </span>
                {levelData.valid.map(str => {
                  const isMatch = compiledRegex ? compiledRegex.test(str) : false;
                  return (
                    <div key={str} className={`p-3 rounded-lg font-mono text-sm border flex justify-between items-center transition-colors ${isMatch ? 'bg-green-500/10 border-green-500/50 text-green-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                      {str} {isMatch && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  );
                })}
              </div>

              {/* Invalid Data Column */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Must Reject
                </span>
                {levelData.invalid.map(str => {
                  // It's a success if the regex DOES NOT match
                  const isRejected = compiledRegex ? !compiledRegex.test(str) : false;
                  // Only show error styling if they have started typing and it accidentally matches
                  const isFailing = compiledRegex && compiledRegex.test(str);
                  
                  return (
                    <div key={str} className={`p-3 rounded-lg font-mono text-sm border flex justify-between items-center transition-colors ${isFailing ? 'bg-red-500/10 border-red-500/50 text-red-300' : isRejected && userRegex ? 'bg-green-500/10 border-green-500/50 text-green-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                      {str} {isRejected && userRegex && <CheckCircle2 className="w-4 h-4" />} {isFailing && <XCircle className="w-4 h-4" />}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {gameState === "LEVEL_CLEARED" && (
          <div className="space-y-6 animate-in zoom-in-95">
            <div className="p-6 rounded-2xl border bg-green-500/10 border-green-500/30">
              <h4 className="text-xl font-black mb-2 flex items-center gap-2 text-green-400">
                <CheckCircle2 /> Pattern Accepted!
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">You matched all the required data and filtered out the corrupt strings.</p>
              
              <div className="bg-black/50 p-3 rounded-lg border border-white/5">
                <span className="text-xs text-pink-400 font-bold block mb-1">Knowledge Drop:</span>
                <p className="text-gray-400 text-sm">{levelData.explanation}</p>
              </div>
            </div>
            
            <button onClick={nextLevel} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
              Next Challenge <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="text-center space-y-4 animate-in zoom-in">
            <Terminal className="w-16 h-16 text-pink-400 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-white">Terminal Disconnected</h4>
            <p className="text-gray-400">{health > 0 ? "You've mastered the patterns. Excellent work!" : "Your pattern allowed corrupt data into the system. Keep studying!"}</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block mx-auto min-w-[200px]">
              <p className="text-gray-400 text-sm mb-1">Final Score</p>
              <p className="text-pink-400 font-black text-4xl">{score}</p>
            </div>
            <button onClick={startGame} className="bg-pink-600 hover:bg-pink-500 text-white font-black px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto mt-6">
              <RotateCcw className="w-5 h-5" /> Reinitialize Terminal
            </button>
          </div>
        )}

      </div>
    </div>
  );
}