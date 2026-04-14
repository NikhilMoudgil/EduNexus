"use client";

import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div suppressHydrationWarning className="relative min-h-screen bg-[#05050f] text-white font-sans overflow-hidden">
      
      {/* 🌌 Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        
        {/* 1. HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <i className="fas fa-sparkles text-cyan-400 text-sm"></i>
            <span className="text-sm font-medium text-gray-300">EduNexus AI is live</span>
          </div>
          <h1 className="text-6xl sm:text-7xl font-black mb-6 tracking-tight leading-tight">
            Learn Smarter with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Artificial Intelligence
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light mb-10">
            A selected list of community-created roadmaps to guide your learning journey. Real-time analytics and gamified mastery built to accelerate your career.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/roadmaps">   
              <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-base shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 font-bold flex items-center justify-center gap-2">
                <i className="fas fa-plus font-light"></i> Create your own roadmap
              </button>
            </Link>
            <Link href="/roadmaps">
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-base hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-semibold flex items-center justify-center gap-2 backdrop-blur-md">
                <i className="fas fa-thumbtack font-light"></i> Official roadmaps
              </button>
            </Link>
          </div>
        </div>

        {/* 2. SMART SEARCH BAR */}
        <div className="max-w-2xl mx-auto mb-20 group">
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-xl shadow-2xl transition-all duration-300 focus-within:border-cyan-500/50 focus-within:bg-white/10 focus-within:shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)] flex items-center">
            <i className="fas fa-search text-gray-400 pl-4 text-lg group-focus-within:text-cyan-400 transition-colors"></i>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type 3 or more characters to search roadmaps..." 
              className="w-full p-4 bg-transparent border-0 focus:ring-0 text-white outline-none placeholder-gray-500"
            />
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition duration-300 font-medium text-sm">
              Search
            </button>
          </div>
        </div>

        {/* 3. INTERACTIVE DASHBOARD PREVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {/* Card 1: Skill Tracking */}
          <div className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Active Career Roadmap</h3>
              <span className="text-xs font-semibold bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">In Progress</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-400">Full-Stack Engineering</span>
              <span className="font-bold text-cyan-400">68%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full w-[68%] shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                <i className="fab fa-react text-2xl text-blue-400 mb-2"></i>
                <p className="text-xs text-gray-400">React.js</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                <i className="fas fa-database text-2xl text-cyan-400 mb-2"></i>
                <p className="text-xs text-white font-medium">PostgreSQL</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4 border border-white/5 opacity-50">
                <i className="fab fa-aws text-2xl text-gray-400 mb-2"></i>
                <p className="text-xs text-gray-400">AWS</p>
              </div>
            </div>
          </div>

          {/* Card 2: Gamification & Streaks */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-3xl p-6 backdrop-blur-sm flex items-center gap-4 hover:scale-[1.02] transition-transform">
              <div className="h-14 w-14 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-2xl shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                <i className="fas fa-fire"></i>
              </div>
              <div>
                <h4 className="text-2xl font-black text-white">12 Days</h4>
                <p className="text-sm text-orange-300/80 font-medium">Learning Streak</p>
              </div>
            </div>
            
            <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col justify-between hover:border-white/20 transition-colors">
              <h4 className="text-gray-400 font-medium mb-4">AI Readiness Score</h4>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-white">840</span>
                <span className="text-green-400 text-sm font-bold mb-1"><i className="fas fa-arrow-up"></i> +24</span>
              </div>
              <p className="text-xs text-gray-500">Top 15% of all learners</p>
            </div>
          </div>
        </div>

        {/* 4. FEATURED ROADMAPS */}
        <div className="pt-10">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <i className="fas fa-map-marked-alt text-purple-500"></i> Featured Roadmaps
          </h2>
          
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16 px-4" 
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full group hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div className="h-40 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Flare Networks Dev Roadmap</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">Start building dApps with Solidity and Flare's enshrined oracles.</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                    <span className="text-xs text-gray-500">By: Community Member</span>
                    <span className="text-yellow-400 text-sm font-medium"><i className="fas fa-star mr-1"></i> 4.8</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full group hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div className="h-40 bg-gradient-to-r from-blue-500 to-teal-500"></div>
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Power BI Data Specialist</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">Roadmap to help you master Power BI and data visualization.</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                    <span className="text-xs text-gray-500">By: DataPro Team</span>
                    <span className="text-yellow-400 text-sm font-medium"><i className="fas fa-star mr-1"></i> 4.6</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full group hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div className="h-40 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">Power Platform Dev</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">Complete roadmap to learn Microsoft Power Platform.</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                    <span className="text-xs text-gray-500">By: MSFT Experts</span>
                    <span className="text-yellow-400 text-sm font-medium"><i className="fas fa-star mr-1"></i> 4.9</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

      </div>
    </div>
  );
}