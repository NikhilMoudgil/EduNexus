"use client";

import { useState, useEffect } from "react";
import { Star, Play, RotateCcw, ArrowRight, CheckCircle, XCircle, Heart, Target, Zap, Trophy } from "lucide-react";

const starScenarios = [
  {
    id: 1,
    question: "Tell me about a time you had to learn a new technology quickly under pressure.",
    phases: [
      {
        letter: "S", title: "Situation", icon: <Target className="w-5 h-5" />,
        options: [
          { text: "During my backend internship, our team decided to migrate from REST to GraphQL halfway through the project.", isCorrect: true, feedback: "Perfect! This sets a clear, specific, and professional context." },
          { text: "I am a very fast learner and always pick up new tech quickly when asked.", isCorrect: false, feedback: "This is a claim, not a situation. You need to describe a specific past event." },
          { text: "I had to learn GraphQL once because my manager told me to do it for a new feature.", isCorrect: false, feedback: "Too vague and sounds a bit passive. Provide more professional context." }
        ]
      },
      {
        letter: "T", title: "Task", icon: <Target className="w-5 h-5" />,
        options: [
          { text: "We had to finish the migration quickly before the client deadline.", isCorrect: false, feedback: "Too vague. What was YOUR specific responsibility?" },
          { text: "My specific responsibility was to rewrite the user authentication endpoints using GraphQL mutations within one week.", isCorrect: true, feedback: "Excellent. You quantified the timeline and specified your exact role." },
          { text: "I needed to read the Apollo Server documentation and figure out how it works.", isCorrect: false, feedback: "That's an action, not the overarching task or goal you were assigned." }
        ]
      },
      {
        letter: "A", title: "Action", icon: <Zap className="w-5 h-5" />,
        options: [
          { text: "I complained to the manager that one week wasn't enough time, but I did my best.", isCorrect: false, feedback: "Never highlight complaining in an interview. Focus on proactive problem-solving." },
          { text: "I just copied some boilerplate code from a GitHub tutorial and modified it until it worked.", isCorrect: false, feedback: "This makes you sound like you don't understand the code. Show intentional learning." },
          { text: "I spent the weekend building a small prototype to understand the docs, and then pair-programmed with a senior dev to ensure security standards.", isCorrect: true, feedback: "Great! This shows dedication, hands-on learning, and teamwork." }
        ]
      },
      {
        letter: "R", title: "Result", icon: <Trophy className="w-5 h-5" />,
        options: [
          { text: "We deployed on time, and the new GraphQL approach reduced our data over-fetching by 40%.", isCorrect: true, feedback: "Nailed it. You provided a measurable, positive business impact." },
          { text: "It got done and everyone was happy with the new endpoints.", isCorrect: false, feedback: "Too generic. Always try to include a measurable metric or specific outcome." },
          { text: "I learned a lot about GraphQL and it was a great experience for my career.", isCorrect: false, feedback: "Personal growth is nice, but employers want to hear how your actions benefited the COMPANY." }
        ]
      }
    ]
  },
  {
    id: 2,
    question: "Tell me about a time you made a critical mistake. How did you handle it?",
    phases: [
      {
        letter: "S", title: "Situation", icon: <Target className="w-5 h-5" />,
        options: [
          { text: "I never really make critical mistakes, I'm very careful with my code.", isCorrect: false, feedback: "Red flag! Everyone makes mistakes. Refusing to admit one shows a lack of self-awareness." },
          { text: "In my junior year, I accidentally pushed a database schema change that crashed our staging environment.", isCorrect: true, feedback: "Great accountability. It's a real mistake, but contained to a staging environment." },
          { text: "Another developer gave me bad code and it broke the server when I pushed it.", isCorrect: false, feedback: "Never throw teammates under the bus. Take ownership of your part." }
        ]
      },
      {
        letter: "T", title: "Task", icon: <Target className="w-5 h-5" />,
        options: [
          { text: "I needed to quickly roll back the change and figure out a way to prevent this from happening in production.", isCorrect: true, feedback: "Perfect. It highlights immediate crisis management and long-term prevention." },
          { text: "I had to fix it before the CTO noticed.", isCorrect: false, feedback: "This sounds sneaky and unprofessional. Transparency is key." },
          { text: "My task was to figure out why the database crashed.", isCorrect: false, feedback: "A bit too simple. The task should include fixing the immediate issue." }
        ]
      },
      {
        letter: "A", title: "Action", icon: <Zap className="w-5 h-5" />,
        options: [
          { text: "I immediately alerted the team, reverted my commit, and then wrote a script to automate schema validation in our CI/CD pipeline.", isCorrect: true, feedback: "Incredible response. You communicated, fixed the issue, and built a safety net." },
          { text: "I stayed quiet, reverted the code secretly, and hoped nobody saw the downtime.", isCorrect: false, feedback: "Transparency is the most important trait in engineering. Never hide outages." },
          { text: "I apologized profusely in the Slack channel and promised to be more careful next time.", isCorrect: false, feedback: "Apologies are fine, but what technical ACTION did you take to fix the root cause?" }
        ]
      },
      {
        letter: "R", title: "Result", icon: <Trophy className="w-5 h-5" />,
        options: [
          { text: "The server was fixed.", isCorrect: false, feedback: "Too brief. What was the broader impact of your actions?" },
          { text: "Staging was back up in 15 minutes, and our new pipeline script caught 3 similar errors before they merged over the next month.", isCorrect: true, feedback: "Excellent! You quantified the downtime and proved your solution had lasting value." },
          { text: "My manager was mad but forgave me eventually.", isCorrect: false, feedback: "Focus on the technical and business outcome, not just the emotional reaction." }
        ]
      }
    ]
  }
];

export default function STARMaestro() {
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "PAUSED" | "GAME_OVER">("IDLE");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [feedback, setFeedback] = useState<{success: boolean, text: string} | null>(null);

  const startGame = () => {
    setScore(0);
    setHealth(3);
    setCurrentScenario(0);
    setCurrentPhase(0);
    setGameState("PLAYING");
  };

  const handleSelection = (isCorrect: boolean, feedbackText: string) => {
    setGameState("PAUSED");
    if (isCorrect) {
      setScore(prev => prev + 500);
      setFeedback({ success: true, text: feedbackText });
    } else {
      setHealth(prev => prev - 1);
      setFeedback({ success: false, text: feedbackText });
    }
  };

  const advanceGame = () => {
    if (health <= 0) {
      setGameState("GAME_OVER");
      return;
    }

    if (feedback?.success) {
      if (currentPhase < 3) {
        // Move to next letter in STAR
        setCurrentPhase(prev => prev + 1);
        setGameState("PLAYING");
      } else {
        // Finished the whole STAR response, move to next question
        if (currentScenario >= starScenarios.length - 1) {
          setGameState("GAME_OVER");
        } else {
          setCurrentScenario(prev => prev + 1);
          setCurrentPhase(0);
          setGameState("PLAYING");
        }
      }
    } else {
      // If they were wrong but still have health, let them try the same phase again
      setGameState("PLAYING");
    }
  };

  const scenario = starScenarios[currentScenario];
  const phase = scenario.phases[currentPhase];

  return (
    <div className="bg-[#0a0a14] border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(234,179,8,0.15)] relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-yellow-400 flex items-center gap-2">
          <Star className="w-6 h-6" /> STAR Maestro
        </h3>
        
        {(gameState === "PLAYING" || gameState === "PAUSED") && (
          <div className="flex gap-4 items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-sm font-bold text-gray-400">Score: <span className="text-white">{score}</span></span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} className={`w-4 h-4 ${i < health ? 'text-yellow-500 fill-yellow-500' : 'text-gray-700'}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="min-h-[400px] flex flex-col justify-center">
        
        {gameState === "IDLE" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2 mb-6">
              {['S','T','A','R'].map((l, i) => (
                <div key={i} className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-xl font-black text-yellow-400">
                  {l}
                </div>
              ))}
            </div>
            <p className="text-gray-400 max-w-md mx-auto">Construct perfect behavioral interview answers using the Situation, Task, Action, Result framework.</p>
            <button onClick={startGame} className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto mt-4">
              <Play className="w-5 h-5" /> Start Interview
            </button>
          </div>
        )}

        {gameState === "PLAYING" && (
          <div className="space-y-6 animate-in fade-in">
            {/* The Interview Question */}
            <div className="bg-[#0d1117] border border-gray-700 p-5 rounded-xl shadow-inner text-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Interviewer Asks:</span>
              <p className="text-white font-medium text-lg">"{scenario.question}"</p>
            </div>

            {/* Current Phase Indicator */}
            <div className="flex items-center gap-4 justify-center py-2">
              {scenario.phases.map((p, idx) => (
                <div key={idx} className={`flex items-center gap-2 ${idx === currentPhase ? 'text-yellow-400 font-bold scale-110 transition-transform' : idx < currentPhase ? 'text-green-400' : 'text-gray-600'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${idx === currentPhase ? 'border-yellow-400 bg-yellow-400/10' : idx < currentPhase ? 'border-green-400 bg-green-400/10' : 'border-gray-600'}`}>
                    {idx < currentPhase ? <CheckCircle className="w-4 h-4" /> : p.letter}
                  </div>
                </div>
              ))}
            </div>

            {/* The Options */}
            <div className="space-y-3">
              <span className="text-sm font-bold text-yellow-500 ml-1 flex items-center gap-2">
                {phase.icon} Select the best {phase.title}:
              </span>
              {phase.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSelection(opt.isCorrect, opt.feedback)}
                  className="w-full text-left bg-white/5 border border-white/10 hover:border-yellow-500 p-4 rounded-xl text-sm text-gray-300 transition hover:bg-yellow-500/10 group flex justify-between items-center"
                >
                  <span className="leading-relaxed pr-4">{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 shrink-0 transition" />
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
                {feedback.success ? "Great Choice!" : "Not Quite."}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">{feedback.text}</p>
            </div>
            <button onClick={advanceGame} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
              {feedback.success && currentPhase === 3 ? "Next Question" : feedback.success ? "Continue Response" : "Try Again"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="text-center space-y-4 animate-in zoom-in">
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-2 fill-yellow-400/20" />
            <h4 className="text-3xl font-black text-white">Interview Concluded</h4>
            <p className="text-gray-400">{health > 0 ? "You nailed the behavioral rounds! Expect an offer." : "The recruiters passed on your profile. Keep practicing!"}</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block mx-auto min-w-[200px]">
              <p className="text-gray-400 text-sm mb-1">Final Score</p>
              <p className="text-yellow-400 font-black text-4xl">{score}</p>
            </div>
            <button onClick={startGame} className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 py-3 rounded-xl transition flex items-center gap-2 mx-auto mt-6">
              <RotateCcw className="w-5 h-5" /> Start New Interview
            </button>
          </div>
        )}

      </div>
    </div>
  );
}