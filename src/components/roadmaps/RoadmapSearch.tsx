'use client';

import { useState } from "react";
import Link from "next/link";

interface RoadmapSearchProps {
  officialRoadmaps: any[];
  userRoadmaps: any[];
  isLoggedIn: boolean;
}

export default function RoadmapSearch({ officialRoadmaps, userRoadmaps, isLoggedIn }: RoadmapSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // 🚀 Filtering Logic: Searches both titles and descriptions
  const filteredOfficial = officialRoadmaps.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUser = userRoadmaps.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative z-10">
      {/* 🔍 SEARCH BAR SECTION */}
      <div className="mb-12 relative max-w-2xl group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <i className="fas fa-search text-gray-500 group-focus-within:text-cyan-400 transition-colors"></i>
        </div>
        <input
          type="text"
          placeholder="Find a domain (e.g. Flutter, Backend, DevOps...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all backdrop-blur-xl placeholder:text-gray-600 font-medium"
        />
      </div>

      {/* DYNAMIC USER ROADMAPS SECTION */}
      {isLoggedIn && filteredUser.length > 0 && (
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <i className="fas fa-robot text-purple-400 text-sm"></i>
            <span className="text-sm font-medium text-purple-300">Your AI Roadmaps</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUser.map((roadmap) => (
              <div key={roadmap.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col">
                <h3 className="text-xl font-black text-white mb-2">{roadmap.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1">
                  Generated on {new Date(roadmap.createdAt).toLocaleDateString('en-IN', { 
                    timeZone: 'Asia/Kolkata',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <Link href={`/roadmaps/${roadmap.id}`}>
                  <button className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-3 rounded-xl font-bold text-sm transition-all duration-300">
                    View Custom Plan →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OFFICIAL ROADMAPS SECTION */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
        <i className="fas fa-map-signs text-cyan-400 text-sm"></i>
        <span className="text-sm font-medium text-cyan-300">Official Guides</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {filteredOfficial.length > 0 ? (
          filteredOfficial.map((roadmap) => (
            <div key={roadmap.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col">
              <div className={`h-40 bg-linear-to-r ${roadmap.color} relative p-6 flex flex-col justify-end`}>
                <i className={`${roadmap.icon} text-6xl text-white/40 absolute top-4 right-4`}></i>
                <h3 className="text-2xl font-black text-white">{roadmap.title}</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">{roadmap.description}</p>
                <Link href={`/roadmaps/${roadmap.id}`}>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300">
                    View Roadmap →
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
            <i className="fas fa-search text-gray-600 text-4xl mb-4"></i>
            <p className="text-gray-400 text-lg">No matching roadmaps found.</p>
            <p className="text-gray-600 mt-1">Try a different keyword or generate a new one below!</p>
          </div>
        )}
      </div>
    </div>
  );
}