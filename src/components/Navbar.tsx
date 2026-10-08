"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#05050f]/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 tracking-tighter group-hover:opacity-80 transition-opacity">
              EduNexus
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Start Here</Link>
            <Link href="/roadmaps" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Roadmaps</Link>
            <Link href="/community" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Community</Link>
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">About Us</Link>
            
            {/* ✅ AI Tutor Link - Route corrected to /ai-tutor */}
            <Link href="/ai-tutor" className="text-sm font-medium flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              <i className="fas fa-robot"></i> AI Tutor
            </Link>
            
            {/* Auth State Handling */}
            {status === "loading" ? (
              <div className="h-10 w-24 bg-white/5 rounded-xl animate-pulse ml-4"></div>
            ) : session ? (
              <div className="flex items-center gap-4 pl-6 ml-2 border-l border-white/10">
                {session.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="Profile" 
                    width={40} 
                    height={40} 
                    className="rounded-full border-2 border-cyan-500/50"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold">
                    {session.user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <button 
                  onClick={() => signOut()}
                  className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 pl-6 ml-2 border-l border-white/10">
                <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Log In
                </Link>
                <Link href="/signup">
                  <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0a0a1a] border-b border-white/10 px-6 py-4 space-y-4 shadow-2xl">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-300">Start Here</Link>
          <Link href="/roadmaps" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-300">Roadmaps</Link>
          <Link href="/community" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-300">Community</Link>
          <Link href="/aboutus" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-300">About Us</Link>
          
          {/* ✅ AI Tutor Link Mobile */}
          <Link href="/ai-tutor" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-purple-400">
            <i className="fas fa-robot mr-2"></i> AI Tutor
          </Link>
          
          <div className="pt-4 border-t border-white/10">
            {session ? (
              <button onClick={() => signOut()} className="block w-full text-left text-sm font-medium text-red-400">Sign Out</button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-300">Log In</Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-cyan-400">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}