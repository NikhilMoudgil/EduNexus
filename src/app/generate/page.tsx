"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { saveRoadmap } from "@/app/actions/roadmap";
import RoadmapSteps from "@/components/generator/RoadmapSteps";
import RoadmapPreview from "@/components/generator/RoadmapPreview";
import GenerationAnimation from "@/components/generator/GenerationAnimation";
import RoadmapToolbar from "@/components/generator/RoadmapToolbar";

const careerRoles = [
  "Full Stack Developer",
  "AI / ML Engineer",
  "Data Scientist",
  "Cybersecurity Engineer",
  "Cloud Architect",
  "DevOps Engineer",
  "Backend Systems Engineer",
  "Mobile App Developer",
];

const learningStyles = [
  { id: "visual", title: "Visual", desc: "Videos, diagrams, and visual flowcharts" },
  { id: "hands-on", title: "Hands-on", desc: "Interactive projects, coding labs & experiments" },
  { id: "structured", title: "Structured", desc: "Step-by-step courses, notes & documentation" },
  { id: "hybrid", title: "Hybrid", desc: "Balanced combination of theory and project building" },
];

const timeAvailabilities = [
  "30–60 mins daily",
  "1–2 hours daily",
  "2–4 hours daily",
  "4+ hours daily (Intensive)",
];

export default function GenerateRoadmapPage() {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState<{ saved: boolean; message?: string }>({ saved: false });

  const [formData, setFormData] = useState({
    branch: "",
    semester: "",
    cgpa: "",
    goal: "",
    habits: "",
    learningStyle: "",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (step === 1 && (!formData.branch || !formData.semester || !formData.cgpa)) {
      setError("Please fill out all academic profile fields.");
      return;
    }
    if (step === 2 && !formData.goal) {
      setError("Please select or specify your target career goal.");
      return;
    }
    if (step === 3 && (!formData.habits || !formData.learningStyle)) {
      setError("Please select your study daily bandwidth and preferred style.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setSaveStatus({ saved: false });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate roadmap.");

      setResult(data.result);

      // Auto-save roadmap if logged in
      if (session?.user) {
        const saveRes = await saveRoadmap(
          `${formData.goal} Roadmap`,
          data.result,
          `Generated for Sem ${formData.semester}`
        );
        if (saveRes.success) {
          setSaveStatus({ saved: true });
        } else {
          setSaveStatus({
            saved: false,
            message: "Generated successfully, but could not auto-save to account.",
          });
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while creating your roadmap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-24 pb-16 px-4 sm:px-8">
      {/* Background Decorator Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Header Banner */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold text-cyan-400 mb-2">
              <span>⚡ AI Career Navigation Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Build Your Personalized Roadmap
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Tell EduNexus where you are in your degree, and we will build your direct path to job readiness.
            </p>
          </div>
        </div>

        {/* Dynamic Wizard Steps */}
        {!result && !loading && (
          <RoadmapSteps
            currentStep={step}
            setStep={setStep}
            maxAccessibleStep={step}
          />
        )}

        {/* Error Banner */}
        {error && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3"
          >
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* MAIN INTERACTIVE WORKSPACE */}
        {loading ? (
          <GenerationAnimation />
        ) : result ? (
          <div>
            <RoadmapToolbar
              title={`${formData.goal} Roadmap`}
              content={result}
              profile={{ branch: formData.branch, sem: formData.semester, goal: formData.goal }}
              onEditInputs={() => setResult(null)}
              onGenerateAgain={handleGenerate}
              saveStatus={saveStatus}
            />
            <div className="bg-black/50 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
              <MarkdownRenderer content={result} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: STEP FORM ENGINE */}
            <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <form onSubmit={handleNext}>
                {/* STEP 1: ACADEMIC PROFILE */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">01. Academic Profile</h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Your branch and current standing dictate prerequisite fundamentals.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="branch" className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Engineering Branch / Degree <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          id="branch"
                          type="text"
                          required
                          placeholder="e.g. Computer Science, Electronics, IT"
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          className="w-full p-4 bg-black/60 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="semester" className="block text-xs font-semibold text-gray-300 mb-1.5">
                            Current Semester (1-8) <span className="text-cyan-400">*</span>
                          </label>
                          <input
                            id="semester"
                            type="number"
                            min="1"
                            max="8"
                            required
                            placeholder="Sem (1-8)"
                            value={formData.semester}
                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                            className="w-full p-4 bg-black/60 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                          />
                        </div>

                        <div>
                          <label htmlFor="cgpa" className="block text-xs font-semibold text-gray-300 mb-1.5">
                            Current CGPA <span className="text-cyan-400">*</span>
                          </label>
                          <input
                            id="cgpa"
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            required
                            placeholder="e.g. 7.8"
                            value={formData.cgpa}
                            onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                            className="w-full p-4 bg-black/60 border border-white/10 rounded-xl text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3.5 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      >
                        Continue to Career Goal →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CAREER DIRECTION */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">02. Career Direction</h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Select an industry track or enter your specific custom target role.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="goal" className="block text-xs font-semibold text-gray-300 mb-2">
                        Target Role / Career Goal <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="goal"
                        type="text"
                        required
                        placeholder="e.g. Full Stack Developer, DevOps Engineer"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full p-4 bg-black/60 border border-cyan-500/40 rounded-xl text-sm text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition mb-4"
                      />

                      <p className="text-[11px] text-gray-400 mb-2 font-medium">Or choose a popular career track:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {careerRoles.map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => setFormData({ ...formData, goal: role })}
                            className={`p-3 text-left text-xs rounded-xl border transition ${
                              formData.goal === role
                                ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                                : "bg-black/40 border-white/10 text-gray-300 hover:border-white/30"
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3.5 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      >
                        Continue to Learning Style →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: LEARNING PREFERENCES */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">03. Learning Preferences</h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Customize daily bandwidth and learning delivery style.
                      </p>
                    </div>

                    {/* Daily Availability */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Daily Time Availability <span className="text-cyan-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeAvailabilities.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({ ...formData, habits: time })}
                            className={`p-3 text-left text-xs rounded-xl border transition ${
                              formData.habits === time
                                ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                                : "bg-black/40 border-white/10 text-gray-300 hover:border-white/30"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Learning Style */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Preferred Learning Style <span className="text-cyan-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {learningStyles.map((style) => (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, learningStyle: style.id })}
                            className={`p-4 text-left rounded-2xl border transition ${
                              formData.learningStyle === style.id
                                ? "bg-violet-500/20 border-violet-500 text-violet-200"
                                : "bg-black/40 border-white/10 text-gray-300 hover:border-white/30"
                            }`}
                          >
                            <p className="font-bold text-xs text-white">{style.title}</p>
                            <p className="text-[11px] text-gray-400 mt-1">{style.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3.5 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      >
                        Review Path →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONFIRM & GENERATE */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">04. Confirm & Generate</h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Review your configuration before synthesizing your career pathway.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 text-xs">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">Branch & Semester:</span>
                        <span className="font-bold text-white">{formData.branch} (Sem {formData.semester})</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">CGPA Baseline:</span>
                        <span className="font-bold text-white">{formData.cgpa} / 10.0</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">Target Role:</span>
                        <span className="font-bold text-cyan-400">{formData.goal}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">Time Bandwidth:</span>
                        <span className="font-bold text-white">{formData.habits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Learning Delivery:</span>
                        <span className="font-bold text-violet-300 capitalize">{formData.learningStyle}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        ← Edit Parameters
                      </button>

                      <button
                        type="button"
                        onClick={handleGenerate}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-violet-600 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-95 transition shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center gap-2"
                      >
                        <span>⚡ Generate My Roadmap</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* RIGHT: LIVE PREVIEW SKELETON */}
            <div className="lg:col-span-5">
              <RoadmapPreview formData={formData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}