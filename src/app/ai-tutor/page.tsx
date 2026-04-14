"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Eraser, Lightbulb, Code2, PenTool, Zap } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

// 🚀 New: Quick Action Chips definition
const QUICK_ACTIONS = [
  { label: "Debug my SQL", icon: <Code2 size={14}/>, prompt: "Can you help me optimize a PostgreSQL query for better performance?" },
  { label: "F1 Aero Basics", icon: <Zap size={14}/>, prompt: "Explain the basics of F1 aerodynamics and ground effect." },
  { label: "Anime Scripting", icon: <PenTool size={14}/>, prompt: "Give me some tips for writing a compelling story arc for an action anime." },
  { label: "Learning Path", icon: <Lightbulb size={14}/>, prompt: "I'm new here. Can you suggest a learning roadmap for Fullstack development?" },
];

export default function AITutorPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 🚀 Action Handler: Allows chips to trigger messages
  const triggerAction = (prompt: string) => {
    handleSendMessage(null, prompt);
  };

  const handleSendMessage = async (e: React.FormEvent | null, directPrompt?: string) => {
    if (e) e.preventDefault();
    const messageContent = directPrompt || input;
    
    if (!messageContent.trim() || isLoading) return;

    const newMessage = { role: "user", content: messageContent };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.ai_response }]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Error: Connection to the Expert failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-24 pb-12 px-6 flex flex-col items-center">
      <div className="fixed top-1/4 left-1/4 w-150 h-150 bg-blue-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-125 h-125 bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col h-[80vh]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black flex items-center gap-3 tracking-tighter">
              <Bot className="w-10 h-10 text-cyan-400" />
              EduNexus Expert
            </h1>
            <p className="text-gray-400 mt-1 font-medium italic">Multi-Domain AI Mentor</p>
          </div>
          <button 
            onClick={() => setMessages([])}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/20 hover:border-red-500/30 transition text-xs font-bold text-gray-400 hover:text-red-400"
          >
            <Eraser size={14} /> RESET
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-4 custom-scrollbar bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Sparkles className="w-16 h-16 text-cyan-400 mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold">How can I guide you?</h2>
              <p className="max-w-xs mt-2 text-gray-400 mb-8 text-sm">Ask about any of our 100+ roadmap domains.</p>
              
              {/* 🚀 Render Action Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => triggerAction(action.prompt)}
                    className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all text-left group"
                  >
                    <div className="p-2 bg-white/5 rounded-lg group-hover:text-cyan-400">{action.icon}</div>
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-white">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-cyan-500 border-cyan-400" : "bg-purple-600 border-purple-500"}`}>
                  {msg.role === "user" ? <User size={20} className="text-black" /> : <Bot size={20} />}
                </div>
                <div className={`p-5 rounded-2xl border ${msg.role === "user" ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10 shadow-xl"}`}>
                  <MarkdownRenderer content={msg.content} />
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 border border-purple-500 flex items-center justify-center animate-pulse">
                <Bot size={20} />
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex gap-1 items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={(e) => handleSendMessage(e)} className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g. F1 aerodynamics or SQL indexing)..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all backdrop-blur-xl placeholder:text-gray-600"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}