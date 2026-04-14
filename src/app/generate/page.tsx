"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { saveRoadmap } from "@/app/actions/roadmap";

export default function GenerateRoadmapPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    branch: "", semester: "", cgpa: "", goal: "", habits: "", learningStyle: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setResult(data.result);

      // 🚀 MAGIC: Auto-save to database if user is logged in
      if (session?.user) {
        await saveRoadmap(
          `${formData.goal} Roadmap`, 
          data.result, 
          `Generated for Sem ${formData.semester}`
        );
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-28 pb-12 px-6">
      <div className="max-w-350 mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT: INPUT FORM (Widened to 450px for better UI) */}
        <div className="w-full lg:w-112.5 shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl sticky top-28 shadow-2xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <i className="fas fa-bolt text-cyan-400"></i> AI Generator
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Branch (e.g. Computer Science)" required className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-sm outline-none focus:border-cyan-500 transition" onChange={(e) => setFormData({...formData, branch: e.target.value})} />
              <div className="flex gap-4">
                <input type="number" placeholder="Sem (1-8)" required className="w-1/2 p-4 bg-black/40 border border-white/10 rounded-xl text-sm outline-none focus:border-cyan-500 transition" onChange={(e) => setFormData({...formData, semester: e.target.value})} />
                <input type="number" step="0.1" placeholder="CGPA" required className="w-1/2 p-4 bg-black/40 border border-white/10 rounded-xl text-sm outline-none focus:border-cyan-500 transition" onChange={(e) => setFormData({...formData, cgpa: e.target.value})} />
              </div>
              <input type="text" placeholder="Goal (e.g. Data Scientist)" required className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-sm outline-none focus:border-cyan-500 transition" onChange={(e) => setFormData({...formData, goal: e.target.value})} />
              <textarea placeholder="Study Habits (e.g. 2 hrs daily)" rows={3} required className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-sm outline-none focus:border-cyan-500 transition" onChange={(e) => setFormData({...formData, habits: e.target.value})}></textarea>
              <select required className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-sm text-gray-400 outline-none focus:border-cyan-500 transition" onChange={(e) => setFormData({...formData, learningStyle: e.target.value})}>
                <option value="">Select Learning Style...</option>
                <option value="visual">Visual (Videos/Diagrams)</option>
                <option value="auditory">Auditory (Lectures)</option>
                <option value="kinesthetic">Kinesthetic (Hands-on)</option>
              </select>
              <button type="submit" disabled={loading} className="w-full bg-cyan-500 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] disabled:opacity-50 transition-all">
                {loading ? "GENERATING..." : "GENERATE ROADMAP"}
              </button>
            </form>
            {error && <p className="mt-4 text-xs text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">{error}</p>}
          </div>
        </div>

        {/* RIGHT: OUTPUT AREA (Scrollable internal container) */}
        <div className="grow bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl h-200 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-cyan-400 font-bold animate-pulse">CONSULTING AI ORACLE...</p>
            </div>
          ) : result ? (
            <MarkdownRenderer content={result} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <i className="fas fa-map-marked-alt text-6xl mb-4 opacity-10"></i>
              <p className="font-medium">Your personalized roadmap will appear here.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}