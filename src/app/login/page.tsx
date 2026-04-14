"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/"); 
      router.refresh();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white flex items-center justify-center p-4 overflow-hidden">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-md rounded-3xl bg-white/5 p-8 shadow-2xl border border-white/10 backdrop-blur-xl relative z-10">
        
        <Link href="/" className="absolute top-8 right-8 text-sm text-gray-400 hover:text-cyan-400 transition font-medium flex items-center gap-2">
          <i className="fas fa-arrow-right flex-row-reverse"></i> Home
        </Link>

        <div className="mb-8 text-left mt-2">
          <div className="mb-6">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tighter">
              EduNexus
            </span>
          </div>
          
          <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400 font-medium">Sign in to your AI learning hub.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-left font-medium">
            <i className="fas fa-exclamation-circle mr-2"></i>{error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full p-4 bg-black/20 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-white placeholder-gray-500" 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full p-4 bg-black/20 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-white placeholder-gray-500" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="my-8 flex items-center">
          <div className="grow border-t border-white/10"></div>
          <span className="mx-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Or continue with</span>
          <div className="grow border-t border-white/10"></div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 font-semibold text-gray-300 hover:bg-white/10 transition duration-300"
          >
            <i className="fab fa-google text-red-400 text-lg"></i>
            Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 font-semibold text-gray-300 hover:bg-white/10 transition duration-300"
          >
            <i className="fab fa-github text-white text-lg"></i>
            GitHub
          </button>
        </div>

        <div className="mt-8 text-center text-sm font-medium text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Initialize one here
          </Link>
        </div>
      </div>
    </div>
  );
}