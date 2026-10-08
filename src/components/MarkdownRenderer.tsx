"use client";

import React from "react";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  if (!content) return null;

  // Formatting helpers for sections, lists, tables, code blocks, and check items
  const renderFormattedLines = (rawText: string) => {
    const lines = rawText.split("\n");
    let inTable = false;
    let tableRows: string[][] = [];

    const flushTable = (acc: React.ReactNode[], index: number) => {
      if (tableRows.length === 0) return;
      const headers = tableRows[0];
      const body = tableRows.slice(2); // skip separator row if present
      acc.push(
        <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/5 text-cyan-400 font-semibold border-b border-white/10">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="p-3 sm:p-4">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {body.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white/[0.02]">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3 sm:p-4">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    };

    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Table Row Detection
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        inTable = true;
        const cells = trimmed.split("|").slice(1, -1);
        tableRows.push(cells);
        return;
      } else if (inTable) {
        flushTable(elements, idx);
      }

      // Headers
      if (trimmed.startsWith("# ")) {
        elements.push(
          <h1 key={idx} className="text-2xl sm:text-3xl font-black text-white mt-8 mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
            <span className="w-2 h-6 bg-cyan-400 rounded-full inline-block"></span>
            {trimmed.replace("# ", "")}
          </h1>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={idx} className="text-lg sm:text-xl font-bold text-cyan-300 mt-6 mb-3 flex items-center gap-2">
            <span className="text-cyan-500">❖</span> {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={idx} className="text-base font-semibold text-violet-300 mt-4 mb-2">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } 
      // Blockquotes
      else if (trimmed.startsWith("> ")) {
        elements.push(
          <blockquote key={idx} className="my-4 border-l-4 border-cyan-500 bg-cyan-500/10 p-4 rounded-r-xl text-cyan-200 text-sm italic">
            {trimmed.replace("> ", "")}
          </blockquote>
        );
      }
      // Checkboxes / Tasks
      else if (trimmed.startsWith("- [ ] ")) {
        elements.push(
          <div key={idx} className="flex items-center gap-3 my-2 text-sm text-gray-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
            <input type="checkbox" readOnly checked={false} className="w-4 h-4 rounded border-gray-600 accent-cyan-500 cursor-not-allowed" />
            <span>{trimmed.replace("- [ ] ", "")}</span>
          </div>
        );
      } else if (trimmed.startsWith("- [x] ")) {
        elements.push(
          <div key={idx} className="flex items-center gap-3 my-2 text-sm text-emerald-300 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
            <input type="checkbox" readOnly checked={true} className="w-4 h-4 rounded accent-emerald-500 cursor-not-allowed" />
            <span className="line-through">{trimmed.replace("- [x] ", "")}</span>
          </div>
        );
      }
      // Unordered Lists
      else if (trimmed.startsWith("- ")) {
        elements.push(
          <li key={idx} className="ml-4 text-sm text-gray-300 list-disc my-1 marker:text-cyan-400">
            {trimmed.replace("- ", "")}
          </li>
        );
      }
      // Empty lines
      else if (trimmed === "") {
        elements.push(<div key={idx} className="h-2" />);
      }
      // Normal Paragraphs
      else {
        elements.push(
          <p key={idx} className="text-sm text-gray-300 leading-relaxed my-2">
            {trimmed}
          </p>
        );
      }
    });

    if (inTable) {
      flushTable(elements, lines.length);
    }

    return elements;
  };

  return <div className="space-y-1 font-sans">{renderFormattedLines(content)}</div>;
}