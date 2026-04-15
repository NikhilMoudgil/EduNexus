"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw, Zap, Trophy, CheckCircle, XCircle, ArrowRight } from "lucide-react";

// The "Database" of questions, now with detailed explanations!
const questions = [
  { 
    id: 1, 
    code: "for(let i=0; i<n; i++) {\n  console.log(i);\n}", 
    answer: "O(n)",
    explanation: "Linear Time: There is a single loop running 'n' times. The execution time grows linearly with the input size."
  },
  { 
    id: 2, 
    code: "let a = 10;\nlet b = 20;\nreturn a + b;", 
    answer: "O(1)",
    explanation: "Constant Time: No matter how large the inputs are, this operation takes the exact same amount of time to execute."
  },
  { 
    id: 3, 
    code: "for(let i=0; i<n; i++) {\n  for(let j=0; j<n; j++) {\n    // logic\n  }\n}", 
    answer: "O(n²)",
    explanation: "Quadratic Time: Nested loops! For every 1 iteration of the outer loop, the inner loop runs 'n' times. n * n = n²."
  },
  { 
    id: 4, 
    code: "function search(arr, val, start, end) {\n  if (start > end) return -1;\n  let mid = Math.floor((start+end)/2);\n  if (arr[mid] === val) return mid;\n  if (arr[mid] > val) \n    return search(arr, val, start, mid-1);\n  return search(arr, val, mid+1, end);\n}", 
    answer: "O(log n)",
    explanation: "Logarithmic Time: This is Binary Search. In each step, the search space is divided in half, drastically reducing the number of operations."
  },
  { 
    id: 5, 
    code: "arr.sort((a,b) => a-b);", 
    answer: "O(n log n)",
    explanation: "Linearithmic Time: Standard efficient sorting algorithms (like Merge Sort or modern browser implementations of .sort) run in O(n log n) time."
  },
];

const options = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)"];

export default function BigOBlitz() {
  // Added PAUSED state
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "PAUSED" | "GAME_OVER">("IDLE");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [streak, setStreak] = useState(0);
  
  // Added feedback state for the informative gamification
  const [feedback, setFeedback] = useState<{isCorrect: boolean, text: string} | null>(null);

  // Timer logic
  useEffect(() => {
    if (gameState !== "PLAYING") return;
    
    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setCurrentQ(Math.floor(Math.random() * questions.length));
    setTimeLeft(10);
    setGameState("PLAYING");
    setFeedback(null);
  };

  const handleAnswer = (selected: string) => {
    const isCorrect = selected === questions[currentQ].answer;
    
    if (isCorrect) {
      const timeBonus = timeLeft; 
      setScore((prev) => prev + 100 + (timeBonus * 10) + (streak * 50));
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
      setTimeLeft((prev) => Math.max(0, prev - 3)); // Penalty is still applied
    }

    // Pause the game and show feedback
    setGameState("PAUSED");
    setFeedback({
      isCorrect,
      text: questions[currentQ].explanation
    });
  };

  const nextQuestion = () => {
    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }
    setCurrentQ(Math.floor(Math.random() * questions.length));
    setTimeLeft(10); // Reset timer for the next question
    setFeedback(null);
    setGameState("PLAYING");
  };

  const handleGameOver = () => {
    setGameState("GAME_OVER");
  };

  return (
    <div className="bg-[#0a0a14] border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden group">
      
      {/* Background Grid Styling */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          Big-O Blitz
        </h3>
        
        {(gameState === "PLAYING" || gameState === "PAUSED") && (
          <div className="flex gap-4 items-center">
            <span className="text-sm font-bold text-gray-400">Streak: <span className="text-orange-400">{streak}🔥</span></span>
            <span className="text-sm font-bold text-gray-400">Score: <span className="text-white">{score}</span></span>
            <div className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${timeLeft <= 3 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-white/10 text-white'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>
        )}
      </div>

      <div className="min-h-[280px] flex flex-col justify-center relative z-10">
        {gameState === "IDLE" && (
          <div className="text-center space-y-4 animate-in fade-in">
            <p className="text-gray-400">Train your algorithm intuition. Identify the time complexity before the timer runs out!</p>
            <button onClick={startGame} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-8 py-3 rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2 mx-auto">
              <Play className="w-5 h-5" /> Start Training
            </button>
          </div>
        )}

        {gameState === "PLAYING" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-black/50 border border-white/5 rounded-xl p-5 font-mono text-sm text-cyan-300 shadow-inner overflow-x-auto">
              <pre><code>{questions[currentQ].code}</code></pre>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {options.map((opt) => (
                <button 
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="bg-white/5 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 text-white font-bold py-2.5 px-6 rounded-xl transition hover:scale-105 active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === "PAUSED" && feedback && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className={`p-6 rounded-2xl border ${feedback.isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="flex items-start gap-4">
                {feedback.isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-green-400 shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400 shrink-0 mt-1" />
                )}
                <div>
                  <h4 className={`text-xl font-black mb-2 ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {feedback.isCorrect ? "Correct!" : "Not quite!"}
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {feedback.text}
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={nextQuestion} 
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2"
            >
              {timeLeft <= 0 ? "See Results" : "Next Code Snippet"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="text-center space-y-4 animate-in zoom-in duration-300">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-white">Session Complete!</h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block mx-auto min-w-[200px]">
              <p className="text-gray-400 text-sm mb-1">Final Score</p>
              <p className="text-cyan-400 font-black text-4xl">{score}</p>
            </div>
            <button onClick={startGame} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-8 py-3 rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2 mx-auto mt-6">
              <RotateCcw className="w-5 h-5" /> Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}