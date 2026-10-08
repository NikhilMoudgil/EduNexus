"use client";

import React, { useEffect, useState } from "react";

const stages = [
  "Analyzing academic profile and semester standing",
  "Evaluating target career prerequisites for chosen goal",
  "Mapping essential technical skill gaps and competencies",
  "Structuring custom learning phases and milestones",
  "Selecting real-world capstone project specifications",
  "Synthesizing placement strategy and weekly study routine",
];

export default function GenerationAnimation() {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      role="alert" 
      aria-live="polite" 
      className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-black/50 border border-cyan-500/30 rounded-3xl backdrop-blur-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)]"
    >
      {/* Animated Radar Visual */}
      <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-violet-500/40 animate-pulse" />
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(6,182,212,0.6)]">
          ❖
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Building Your Career Pathway</h3>
      <p className="text-xs text-gray-400 mb-8 max-w-sm">
        EduNexus AI is synthesizing your academic baseline with industry standards.
      </p>

      {/* Progressive Stage Tracker */}
      <div className="w-full max-w-md space-y-3 text-left">
        {stages.map((stage, idx) => {
          const isDone = idx < currentStageIdx;
          const isCurrent = idx === currentStageIdx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                isCurrent
                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-300"
                  : isDone
                  ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                  : "bg-white/[0.02] border-white/5 text-gray-600"
              }`}
            >
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                {isDone ? "✓" : isCurrent ? "→" : "○"}
              </span>
              <span className="text-xs font-medium truncate">{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}