"use client";

import React, { useState } from "react";
import { downloadMarkdown, printOrSavePDF } from "@/lib/exportRoadmap";

interface ToolbarProps {
  title: string;
  content: string;
  profile: { branch: string; sem: string; goal: string };
  onEditInputs: () => void;
  onGenerateAgain: () => void;
  saveStatus: { saved: boolean; message?: string };
}

export default function RoadmapToolbar({
  title,
  content,
  profile,
  onEditInputs,
  onGenerateAgain,
  saveStatus,
}: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-black/60 border border-white/10 rounded-2xl mb-6 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        {saveStatus.saved ? (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Saved to My Roadmaps
          </span>
        ) : saveStatus.message ? (
          <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
            {saveStatus.message}
          </span>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={() => printOrSavePDF(title, content, profile)}
          className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Export Roadmap as PDF Document"
        >
          📄 Download PDF
        </button>

        <button
          onClick={() => downloadMarkdown(title, content)}
          className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Download Roadmap Markdown File"
        >
          ⬇ Markdown
        </button>

        <button
          onClick={handleCopy}
          className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Copy Roadmap text to clipboard"
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>

        <button
          onClick={onEditInputs}
          className="px-3.5 py-2 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-xl text-xs font-bold transition outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Edit roadmap input fields"
        >
          ✏ Edit Inputs
        </button>

        <button
          onClick={onGenerateAgain}
          className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-violet-600 hover:opacity-90 text-black font-black rounded-xl text-xs uppercase tracking-wider transition outline-none focus:ring-2 focus:ring-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          aria-label="Regenerate Roadmap with current parameters"
        >
          ↻ Regenerate
        </button>
      </div>
    </div>
  );
}