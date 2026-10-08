"use client";

import React from "react";

interface PreviewProps {
  formData: {
    branch: string;
    semester: string;
    cgpa: string;
    goal: string;
    learningStyle: string;
  };
}

export default function RoadmapPreview({ formData }: PreviewProps) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Live Roadmap Blueprint
          </span>
          <span className="text-xs text-gray-500">Interactive Preview</span>
        </div>

        <div className="space-y-3 mb-6 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Academic Profile</p>
            <p className="text-sm font-bold text-white">
              {formData.branch || "Branch Unspecified"}{" "}
              {formData.semester ? `• Sem ${formData.semester}` : ""}{" "}
              {formData.cgpa ? `(CGPA: ${formData.cgpa})` : ""}
            </p>
          </div>
          <div className="border-t border-white/5 pt-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Target Milestone</p>
            <p className="text-sm font-bold text-cyan-300">{formData.goal || "Target Goal Not Set"}</p>
          </div>
        </div>

        {/* Pathway Skeleton Visualization */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-violet-500 before:to-emerald-500">
          <div className="relative flex items-center gap-3">
            <div className="absolute -left-[19px] w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <div>
              <p className="text-xs font-bold text-white">01. Academic Foundations</p>
              <p className="text-[11px] text-gray-400">Core engineering concepts & prerequisites</p>
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="absolute -left-[19px] w-3.5 h-3.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            <div>
              <p className="text-xs font-bold text-white">02. Applied Skill Stack</p>
              <p className="text-[11px] text-gray-400">Practical tools for {formData.goal || "Target Role"}</p>
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="absolute -left-[19px] w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            <div>
              <p className="text-xs font-bold text-white">03. Portfolio Projects</p>
              <p className="text-[11px] text-gray-400">Real-world capstone application</p>
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="absolute -left-[19px] w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <div>
              <p className="text-xs font-bold text-emerald-300">04. Placement Readiness</p>
              <p className="text-[11px] text-gray-400">Interview mocks & DSA targets</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 text-center">
        <p className="text-[11px] text-gray-500">
          Path customized for <span className="text-gray-300 font-medium">{formData.learningStyle || "Standard"}</span> learning mode.
        </p>
      </div>
    </div>
  );
}