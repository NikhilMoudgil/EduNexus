"use client";

import React from "react";

interface StepProps {
  currentStep: number;
  setStep: (step: number) => void;
  maxAccessibleStep: number;
}

const steps = [
  { id: 1, label: "Profile", short: "01" },
  { id: 2, label: "Direction", short: "02" },
  { id: 3, label: "Learning Style", short: "03" },
  { id: 4, label: "Generate", short: "04" },
];

export default function RoadmapSteps({ currentStep, setStep, maxAccessibleStep }: StepProps) {
  return (
    <nav aria-label="Roadmap Generation Progress" className="w-full mb-8">
      <ol className="grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isDisabled = step.id > maxAccessibleStep;

          return (
            <li key={step.id} className="relative">
              <button
                type="button"
                onClick={() => !isDisabled && setStep(step.id)}
                disabled={isDisabled}
                aria-current={isActive ? "step" : undefined}
                className={`w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all outline-none focus:ring-2 focus:ring-cyan-400 ${
                  isActive
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : isCompleted
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 cursor-pointer"
                    : "bg-black/30 border-white/10 text-gray-500 cursor-not-allowed opacity-60"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    isActive
                      ? "bg-cyan-400 text-black"
                      : isCompleted
                      ? "bg-emerald-500 text-black"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : step.short}
                </span>
                <span className="hidden sm:inline truncate">{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}