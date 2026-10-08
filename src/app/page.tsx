"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Variants } from "framer-motion";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";


// Importing the modular components based on your directory structure
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ==========================================
// 1. HERO SECTION
// ==========================================
const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-36 pb-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-100 mb-6 leading-[1.1]">
            Your degree isn't a roadmap. <br />
            <span className="text-cyan-400 italic">Build one.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 font-light mb-10 leading-relaxed max-w-lg">
            Cognitra turns your goals, skills, and interests into a personalized path from learning to projects, internships, and placement.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link href="/generate" className="px-8 py-4 bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 rounded-none hover:bg-cyan-400/25 hover:border-cyan-400/60 transition-all text-sm font-semibold tracking-wide uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
              Build My Roadmap
            </Link>
            <Link href="/roadmaps" className="px-8 py-4 bg-transparent text-gray-200 border border-gray-700 rounded-none hover:bg-gray-800/60 hover:text-white transition-all text-sm font-semibold tracking-wide uppercase flex items-center justify-center">
              Explore Roadmaps
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Roadmap Animation */}
        <div className="hidden lg:flex justify-center items-center h-full">
          <svg width="400" height="480" viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M200 40 L200 140 L100 240 L100 340" 
              stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path 
              d="M200 140 L300 240 L300 340 L200 440" 
              stroke="#A855F7" strokeWidth="2" strokeOpacity="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path 
              d="M100 340 L200 440" 
              stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            />
            
            {/* Nodes */}
            <motion.circle cx="200" cy="40" r="6" fill="#00E5FF" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0 }} />
            <motion.circle cx="200" cy="140" r="6" fill="#1F2937" stroke="#6B7280" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
            <motion.circle cx="100" cy="240" r="6" fill="#1F2937" stroke="#6B7280" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
            <motion.circle cx="300" cy="240" r="6" fill="#1F2937" stroke="#6B7280" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
            <motion.circle cx="200" cy="440" r="8" fill="#FFB000" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2 }} />

            {/* Labels */}
            <motion.text x="220" y="45" fill="#E5E7EB" fontSize="12" fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>YOUR GOAL</motion.text>
            <motion.text x="220" y="145" fill="#9CA3AF" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>Programming</motion.text>
            <motion.text x="35" y="245" fill="#9CA3AF" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Frontend</motion.text>
            <motion.text x="320" y="245" fill="#9CA3AF" fontSize="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>Backend</motion.text>
            <motion.text x="220" y="445" fill="#FFB000" fontSize="12" fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Placement</motion.text>
          </svg>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 2. PROBLEM SECTION 
// ==========================================
const ProblemSection = () => {
  return (
    <section className="py-24 bg-[#020408] border-t border-white/10 relative overflow-hidden">
      {/* Background radial glow to boost brightness */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-200 tracking-tight mb-3">
            Most students don't have a learning problem.
          </h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
            They have a <span className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-8">direction</span> problem.
          </h3>
          
          <div className="mt-16 flex flex-col items-center gap-4 text-gray-200 font-mono text-sm">
            <div className="border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 px-6 py-3 rounded-md shadow-md font-medium">
              What should I learn?
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-cyan-400 to-white/20"></div>
            
            <div className="flex gap-4">
              <div className="border border-white/15 bg-white/10 text-gray-300 px-4 py-2 rounded-md font-medium">React?</div>
              <div className="border border-white/15 bg-white/10 text-gray-300 px-4 py-2 rounded-md font-medium">Python?</div>
              <div className="border border-white/15 bg-white/10 text-gray-300 px-4 py-2 rounded-md font-medium">AI?</div>
            </div>
            
            <div className="w-px h-6 bg-gradient-to-b from-white/20 to-cyan-400"></div>
            <div className="border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 px-6 py-3 rounded-md shadow-md font-medium">
              Which project?
            </div>
            <div className="w-px h-6 bg-cyan-400"></div>
            
            <div className="border border-cyan-400 bg-cyan-400/15 text-cyan-300 px-8 py-4 mt-2 text-base font-semibold tracking-wide rounded-md shadow-[0_0_25px_rgba(0,229,255,0.2)]">
              Cognitra connects the dots.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. PERSONALIZED ROADMAP HERO (REDESIGNED)
// ==========================================

interface RoadmapStage {
  id: string;
  stageNumber: string;
  title: string;
  status: "FOUNDATION" | "BUILD" | "SPECIALIZE" | "GOAL";
  supportingMessage: string;
  description: string;
  skills: string[];
}

const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: "stage-1",
    stageNumber: "01",
    title: "B.Tech CSE Foundations",
    status: "FOUNDATION",
    supportingMessage: "Start with the fundamentals.",
    description: "Build the fundamentals that everything else depends on.",
    skills: ["C++", "DSA", "OOP"],
  },
  {
    id: "stage-2",
    stageNumber: "02",
    title: "Web Development",
    status: "BUILD",
    supportingMessage: "Build practical skills.",
    description: "Turn concepts into real applications.",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "stage-3",
    stageNumber: "03",
    title: "Backend & AI Engineering",
    status: "SPECIALIZE",
    supportingMessage: "Specialize with real projects.",
    description: "Build production-ready systems and AI-powered applications.",
    skills: ["PostgreSQL", "LLMs & RAG"],
  },
  {
    id: "stage-4",
    stageNumber: "04",
    title: "Placement Ready",
    status: "GOAL",
    supportingMessage: "Become placement ready.",
    description: "Turn your skills into projects, internships and opportunities.",
    skills: [],
  },
];

export const LearningRoadmapHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Bind scroll progress naturally as Section 3 enters/leaves the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 25%"],
  });

  // Smooth out tracing line movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const lineScaleY = useTransform(smoothProgress, [0, 0.95], [0, 1]);
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Scroll listener that updates active step continuously
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    if (latest < 0.25) {
      if (activeIndex !== 0) setActiveIndex(0);
    } else if (latest < 0.55) {
      if (activeIndex !== 1) setActiveIndex(1);
    } else if (latest < 0.8) {
      if (activeIndex !== 2) setActiveIndex(2);
    } else {
      if (activeIndex !== 3) setActiveIndex(3);
    }
  });

  const currentStage = ROADMAP_STAGES[activeIndex] || ROADMAP_STAGES[0];

  return (
    <section
      ref={containerRef}
      id="learning-roadmap-section"
      className="py-24 bg-[#03050a] text-gray-200 border-t border-white/5 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Interactive Path Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.12] mb-3">
            From confused <span className="text-cyan-400 italic">to clear.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
            Build a learning path around your goals, current skills, and career direction.
          </p>
        </div>

        {/* AI Roadmap Summary Bar */}
        <div className="border border-white/10 bg-[#020408]/90 backdrop-blur-md rounded-2xl p-5 md:p-6 mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-wider font-semibold text-gray-200">
                AI GENERATED ROADMAP
              </span>
              <span className="text-[10px] font-mono uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
                Personalized
              </span>
            </div>

            {/* Active Stage Scroll Indicator */}
            <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
              <span>STAGE PROGRESS</span>
              <span className="text-cyan-400 font-semibold text-sm">
                0{activeIndex + 1} / 04
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg">
              <span className="text-gray-500 block text-[10px] uppercase font-mono mb-1">
                Career Goal
              </span>
              <span className="font-semibold text-gray-200 text-sm">
                Full-Stack Engineer
              </span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg">
              <span className="text-gray-500 block text-[10px] uppercase font-mono mb-1">
                Based On
              </span>
              <span className="text-gray-300 text-sm">
                CSE Syllabus & Target Skills
              </span>
            </div>
            <div className="bg-cyan-950/20 border border-cyan-500/20 p-3 rounded-lg flex flex-col justify-between">
              <span className="text-cyan-400 block text-[10px] uppercase font-mono mb-0.5">
                Current Focus
              </span>
              <span className="text-cyan-200 font-medium text-sm truncate">
                → {currentStage.title}
              </span>
            </div>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        {/* Roadmap Stages View */}
        <div className="relative pl-6 md:pl-10">
          
          {/* Animated Tracing Line */}
          <div className="absolute left-2.5 md:left-4 top-4 bottom-4 w-[2px] pointer-events-none flex justify-center">
            <div className="w-[2px] h-full bg-white/10 rounded-full" />
            <motion.div
              className="absolute top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-violet-500 to-amber-400 rounded-full shadow-[0_0_12px_rgba(0,229,255,0.7)] origin-top"
              style={{ scaleY: lineScaleY, height: "100%" }}
            />
          </div>

          <div className="space-y-6">
            {ROADMAP_STAGES.map((stage, idx) => {
              const isActive = idx === activeIndex;
              const isCompleted = idx < activeIndex;
              const isGoalNode = stage.status === "GOAL";

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex items-start gap-4 md:gap-6 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "opacity-100 scale-[1.01]"
                      : isCompleted
                      ? "opacity-80 scale-[0.99]"
                      : "opacity-40 hover:opacity-70 scale-[0.98]"
                  }`}
                >
                  {/* Bullet Node */}
                  <div className="relative z-10 shrink-0 mt-1.5 -ml-6 md:-ml-10">
                    {isGoalNode ? (
                      <div
                        className={`w-7 h-7 rotate-45 flex items-center justify-center transition-all duration-300 ${
                          isActive || isCompleted
                            ? "bg-amber-500 shadow-[0_0_18px_rgba(245,158,11,0.8)] scale-110"
                            : "border-2 border-amber-500/50 bg-[#020408]"
                        }`}
                      >
                        <div className="w-2 h-2 bg-[#020408] -rotate-45 rounded-sm" />
                      </div>
                    ) : (
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-cyan-400 text-[#020408] shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                            : isActive
                            ? "border-2 border-cyan-400 bg-[#020408] shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-110"
                            : "border-2 border-white/20 bg-[#020408]"
                        }`}
                      >
                        {isCompleted ? (
                          <svg
                            className="w-4 h-4 stroke-[3]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isActive ? "bg-cyan-400 animate-pulse" : "bg-gray-600"
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Stage Card */}
                  <div
                    className={`flex-1 p-5 md:p-6 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "border-cyan-500/50 bg-[#040812] shadow-[0_0_30px_rgba(0,229,255,0.12)]"
                        : isCompleted
                        ? "border-white/10 bg-[#020408]/80 hover:border-white/20"
                        : "border-white/5 bg-[#020408]/30 hover:border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold tracking-wider ${
                            isGoalNode
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                              : isActive || isCompleted
                              ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                              : "bg-white/5 text-gray-500 border border-white/10"
                          }`}
                        >
                          {stage.status}
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                          STAGE {stage.stageNumber}
                        </span>
                      </div>

                      {isCompleted && (
                        <span className="text-xs text-cyan-400 font-mono">
                          ✓ Completed
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-xl md:text-2xl font-semibold mb-2 tracking-tight ${
                        isGoalNode && (isActive || isCompleted)
                          ? "text-amber-400"
                          : isActive
                          ? "text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {stage.title}
                    </h3>

                    {/* Stage Supporting Message on Active */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-sm italic font-medium text-cyan-300 mb-2"
                        >
                          "{stage.supportingMessage}"
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-4">
                      {stage.description}
                    </p>

                    {/* Skill Badges */}
                    {stage.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {stage.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`text-xs px-3 py-1 rounded-md transition-all duration-300 flex items-center gap-2 ${
                              isActive
                                ? "text-gray-100 border border-cyan-500/40 bg-cyan-500/15 font-medium shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                                : isCompleted
                                ? "text-gray-300 border border-white/10 bg-white/5"
                                : "text-gray-500 border border-white/5 bg-white/[0.02]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive
                                  ? "bg-cyan-400"
                                  : isCompleted
                                  ? "bg-gray-400"
                                  : "bg-gray-600"
                              }`}
                            />
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
// ==========================================
// 4. ROADMAP JOURNEY
// ==========================================
interface JourneyStep {
  num: string;
  title: string;
  desc: string;
  subtext: string;
  badge: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    num: "01",
    title: "Discover",
    desc: "Understand your goal.",
    subtext: "Find direction before you start collecting skills.",
    badge: "STAGE 01 • DISCOVER",
  },
  {
    num: "02",
    title: "Learn",
    desc: "Follow a personalized roadmap.",
    subtext: "Know exactly what to learn and why it matters.",
    badge: "STAGE 02 • LEARN",
  },
  {
    num: "03",
    title: "Build",
    desc: "Turn knowledge into projects.",
    subtext: "Make your skills visible through real work.",
    badge: "STAGE 03 • BUILD",
  },
  {
    num: "04",
    title: "Practice",
    desc: "Improve through real challenges.",
    subtext: "Test your knowledge before the interview does.",
    badge: "STAGE 04 • PRACTICE",
  },
  {
    num: "05",
    title: "Get Hired",
    desc: "Prepare for internships and placements.",
    subtext: "Turn preparation into opportunity.",
    badge: "STAGE 05 • GET HIRED",
  },
];

const RoadmapJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Safely clamp active index strictly within bounds [0, 4]
  const safeActiveIndex = Math.max(0, Math.min(activeIndex, JOURNEY_STEPS.length - 1));
  const currentStep = JOURNEY_STEPS[safeActiveIndex] || JOURNEY_STEPS[0];

  // Bind scroll progress naturally across the stage sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const journeyLineScaleY = useTransform(smoothProgress, [0, 0.95], [0, 1]);

  // Update active stage continuously as user scrolls with strict boundary clamping
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    const computedStage = Math.max(0, Math.min(Math.floor(latest * 5), JOURNEY_STEPS.length - 1));
    if (computedStage !== activeIndex) {
      setActiveIndex(computedStage);
    }
  });

  return (
    <section
      ref={containerRef}
      id="roadmap-journey-section"
      className="relative bg-[#020408] border-t border-white/10 md:h-[280vh]"
    >
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-cyan-500/5 blur-[180px] pointer-events-none rounded-full" />

      {/* Sticky Viewport Frame for Scroll-Driven Interactive Experience */}
      <div className="md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-center py-16 md:py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          
          {/* Section Introduction Header */}
          <div className="mb-8 md:mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              HOW IT COMES TOGETHER
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
              A clear path from <span className="text-cyan-400 italic">learning to opportunity.</span>
            </h2>
          </div>

          {/* Main Journey Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Narrative Storyteller */}
            <div className="lg:col-span-5 relative pl-6 md:pl-8">
              
              {/* Connecting Journey Line */}
              <div className="absolute left-2 md:left-3 top-2 bottom-2 w-[2px] bg-white/10 rounded-full pointer-events-none">
                <motion.div
                  className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400 rounded-full origin-top"
                  style={{ scaleY: journeyLineScaleY, height: "100%" }}
                />
              </div>

              {/* Stage Narrative Steps */}
              <div className="space-y-6 md:space-y-7">
                {JOURNEY_STEPS.map((step, idx) => {
                  const isActive = idx === safeActiveIndex;
                  const isCompleted = idx < safeActiveIndex;

                  return (
                    <div
                      key={step.num}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative cursor-pointer transition-all duration-300 group ${
                        isActive
                          ? "opacity-100 translate-x-1"
                          : isCompleted
                          ? "opacity-75 hover:opacity-100"
                          : "opacity-40 hover:opacity-70"
                      }`}
                    >
                      {/* Node Bullet Indicator */}
                      <div
                        className={`absolute -left-[21px] md:-left-[25px] top-1.5 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-cyan-400 text-[#020408] shadow-[0_0_10px_rgba(0,229,255,0.6)]"
                            : isActive
                            ? "border-2 border-cyan-400 bg-[#020408] shadow-[0_0_12px_rgba(0,229,255,0.8)] scale-125"
                            : "border border-white/30 bg-[#020408]"
                        }`}
                      >
                        {isCompleted && (
                          <svg className="w-2.5 h-2.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {isActive && !isCompleted && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                      </div>

                      {/* Text Narrative */}
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-xs font-mono font-semibold transition-colors ${
                              isActive
                                ? "text-cyan-400"
                                : isCompleted
                                ? "text-gray-300"
                                : "text-gray-500"
                            }`}
                          >
                            {step.num} —
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-mono uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded">
                              Active Focus
                            </span>
                          )}
                        </div>

                        <h3
                          className={`text-2xl md:text-3xl font-medium tracking-tight transition-all ${
                            isActive
                              ? "text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.3)] scale-[1.02]"
                              : isCompleted
                              ? "text-gray-200"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>

                        <p
                          className={`text-sm md:text-base font-light transition-colors mt-0.5 ${
                            isActive ? "text-gray-200" : "text-gray-400"
                          }`}
                        >
                          {step.desc}
                        </p>

                        {/* Supporting Subtext on Active */}
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-xs text-cyan-300/90 font-mono mt-1 pt-1 border-t border-cyan-500/20"
                          >
                            {step.subtext}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Living Visual Stage Simulator */}
            <div className="lg:col-span-7">
              <div className="relative border border-white/10 bg-[#03050a]/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden min-h-[380px] md:min-h-[420px] flex flex-col justify-between">
                
                {/* Background Grid & Ambient Glow */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

                {/* Visual Stage Header */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-cyan-300 tracking-wider">
                      {currentStep.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">
                    STAGE 0{safeActiveIndex + 1} / 05
                  </span>
                </div>

                {/* Dynamic Visual Stage Content */}
                <div className="relative z-10 my-auto py-6">
                  <AnimatePresence mode="wait">
                    {/* Stage 01: Discover */}
                    {safeActiveIndex === 0 && (
                      <motion.div
                        key="stage-0"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-4"
                      >
                        <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20">
                          <span className="text-[10px] font-mono text-cyan-400 block uppercase mb-1">YOUR GOAL</span>
                          <span className="text-xl font-semibold text-white">Full-Stack AI Engineer</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                          <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                            <span className="text-gray-400 block mb-1 text-[10px]">CURRENT BASELINE</span>
                            <span className="text-gray-200 font-semibold">C++ • DSA</span>
                          </div>
                          <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                            <span className="text-gray-400 block mb-1 text-[10px]">TARGET TIMELINE</span>
                            <span className="text-cyan-300 font-semibold">12-Month Path</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-gray-400">
                          <span>DIRECTION PIPELINE</span>
                          <span className="text-cyan-400 font-semibold">Goal → Analysis → Roadmap</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Stage 02: Learn */}
                    {safeActiveIndex === 1 && (
                      <motion.div
                        key="stage-1"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-3"
                      >
                        <div className="text-xs font-mono text-gray-400 mb-2">PERSONALIZED LEARNING MODULES</div>
                        
                        <div className="space-y-2 text-xs font-mono">
                          <div className="p-3 rounded-lg border border-cyan-500/40 bg-cyan-950/30 flex items-center justify-between text-cyan-200">
                            <div className="flex items-center gap-2">
                              <span className="text-cyan-400">✓</span>
                              <span>Foundation: C++ & DSA</span>
                            </div>
                            <span className="text-[10px] bg-cyan-500/20 border border-cyan-400/40 px-2 py-0.5 rounded text-cyan-300">Completed</span>
                          </div>

                          <div className="p-3 rounded-lg border border-cyan-400 bg-cyan-950/40 flex items-center justify-between text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                              <span className="font-semibold">Web: React, Next.js, TypeScript</span>
                            </div>
                            <span className="text-[10px] bg-cyan-400 text-[#020408] font-bold px-2 py-0.5 rounded">Active Focus</span>
                          </div>

                          <div className="p-3 rounded-lg border border-white/10 bg-white/5 flex items-center justify-between text-gray-400">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">○</span>
                              <span>Backend: Node.js, PostgreSQL, Prisma</span>
                            </div>
                            <span className="text-[10px] text-gray-500">Upcoming</span>
                          </div>

                          <div className="p-3 rounded-lg border border-white/10 bg-white/5 flex items-center justify-between text-gray-400">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">○</span>
                              <span>AI Layer: LLM Integrations & Vector DBs</span>
                            </div>
                            <span className="text-[10px] text-gray-500">Upcoming</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Stage 03: Build */}
                    {safeActiveIndex === 2 && (
                      <motion.div
                        key="stage-2"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-4"
                      >
                        <div className="p-4 rounded-xl border border-white/15 bg-[#020408] font-mono text-xs">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                            <span className="text-gray-300 font-semibold">PROJECT: Student Platform</span>
                            <span className="text-cyan-400 animate-pulse">[ BUILDING... ]</span>
                          </div>
                          
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Frontend UI</span>
                              <span className="text-cyan-400 font-bold">✓ Complete</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Backend API</span>
                              <span className="text-cyan-400 font-bold">✓ Complete</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300">Database Schema</span>
                              <span className="text-amber-400 font-bold">● Compiling</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">AI Integration</span>
                              <span className="text-gray-500">○ Queued</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300 flex items-center justify-between">
                          <span>CODE COMMIT STATUS</span>
                          <span className="font-semibold">git push origin main ✓</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Stage 04: Practice */}
                    {safeActiveIndex === 3 && (
                      <motion.div
                        key="stage-3"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-4"
                      >
                        <div className="p-4 rounded-xl border border-white/15 bg-[#020408] font-mono text-xs">
                          <div className="text-gray-400 text-[10px] uppercase mb-1">INTERVIEW CHALLENGE</div>
                          <div className="text-white text-sm font-semibold mb-3">Design a Scalable Distributed API</div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-gray-400">Algorithmic Score</span>
                                <span className="text-cyan-400 font-bold">88%</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-400 w-[88%]" />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-gray-400">System Design Readiness</span>
                                <span className="text-purple-400 font-bold">76%</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[76%]" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 flex items-center justify-between">
                          <span>NEXT BENCHMARK</span>
                          <span className="font-semibold">Mock Technical Interview →</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Stage 05: Get Hired */}
                    {safeActiveIndex === 4 && (
                      <motion.div
                        key="stage-4"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <div className="p-5 rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-[#020408] to-cyan-950/30 text-xs font-mono relative overflow-hidden shadow-[0_0_25px_rgba(245,158,11,0.15)]">
                          <div className="flex items-center justify-between pb-3 border-b border-amber-500/30 mb-3">
                            <span className="text-amber-400 font-bold text-sm tracking-wide">CAREER VERIFIED</span>
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">READY</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-200 mb-4">
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400">✓</span>
                              <span>Skills Verified</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400">✓</span>
                              <span>Projects Built</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400">✓</span>
                              <span>Challenges Cleared</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400">✓</span>
                              <span>Interview Ready</span>
                            </div>
                          </div>

                          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-semibold text-center text-xs">
                            → READY FOR INTERNSHIPS & PLACEMENTS
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Stage Progress Indicators */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>CAREER JOURNEY SIMULATOR</span>
                  <div className="flex items-center gap-1.5">
                    {JOURNEY_STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === safeActiveIndex
                            ? "w-6 bg-cyan-400"
                            : i < safeActiveIndex
                            ? "w-2 bg-gray-400"
                            : "w-2 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. FEATURE BENTO GRID 
// ==========================================
const FeatureBento = () => {
  return (
    <section className="py-28 bg-[#020408] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-100 tracking-tight mb-16 text-center">Everything you need to move forward.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="md:col-span-2 border border-white/10 bg-[#03050a] p-8 rounded-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Core System</span>
              <h3 className="text-2xl font-semibold text-gray-100 mt-2 mb-3">Roadmap Engine</h3>
              <p className="text-gray-300 font-light leading-relaxed">Build an intelligent, personalized learning path tailored specifically to your degree, career target, and existing technical skill gaps.</p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">Dynamic Node Graph • Adaptive Milestones</div>
          </div>
          
          {/* Feature 2 */}
          <div className="border border-white/10 bg-[#03050a] p-8 rounded-xl flex flex-col justify-between hover:border-purple-500/40 transition-all">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">Context-Aware</span>
              <h3 className="text-xl font-semibold text-gray-100 mt-2 mb-2">AI Mentor</h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">Ask questions, generate custom exercises, and debug code with an AI that knows your active roadmap context.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">24/7 Academic & Tech Support</div>
          </div>

          {/* Feature 3 */}
          <div className="border border-white/10 bg-[#03050a] p-8 rounded-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Hands-On Practice</span>
              <h3 className="text-xl font-semibold text-gray-100 mt-2 mb-2">Dev Arena</h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">Practice real development problems, full-stack challenges, and core algorithmic exercises directly in your browser.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">Real-World Code Evaluation</div>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-2 border border-white/10 bg-[#03050a] p-8 rounded-xl flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Career Prep</span>
              <h3 className="text-xl font-semibold text-gray-100 mt-2 mb-2">Placement Tracker</h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">Track job applications, schedule mock interviews, measure placement readiness metrics, and transition from learning to getting hired.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">Resume Analytics • Application Kanban</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 7. FINAL CTA
// ==========================================
const FinalCTA = () => {
  return (
    <section className="py-36 bg-[#03050a] relative overflow-hidden border-t border-white/5 pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,255,0.08)_0%,transparent_60%)]"></div>
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-100 tracking-tight mb-6">Stop guessing what to learn next.</h2>
        <p className="text-xl text-gray-300 font-light mb-10">Build a roadmap that turns your goals into clear, actionable execution.</p>
        <Link href="/generate" className="inline-block px-10 py-5 bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-400/25 transition-all text-sm font-semibold tracking-wide uppercase shadow-[0_0_25px_rgba(0,229,255,0.15)]">
          Build My Roadmap →
        </Link>
      </div>
    </section>
  );
};

// ==========================================
// MAIN EXPORT
// ==========================================
export default function HomePage() {
  return (
    <div suppressHydrationWarning className="bg-[#03050a] text-gray-200 font-sans selection:bg-cyan-500/30">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <LearningRoadmapHero />
        <RoadmapJourney />
        <FeatureBento />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}