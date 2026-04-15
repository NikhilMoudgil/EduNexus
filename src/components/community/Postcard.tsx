"use client";

import { useState, useTransition } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ShieldCheck, Heart, MessageSquare, Share2, MoreHorizontal, Trash2, Send, Link as LinkIcon, BarChart2 } from "lucide-react";
import { toggleLike, addComment } from "@/app/actions/posts";

export default function PostCard({ post, currentUserId, deleteAction }: any) {
  const [isPending, startTransition] = useTransition();
  const [commentText, setCommentText] = useState("");
  const isLiked = post.likes?.some((like: any) => like.userId === currentUserId);

  const handleLike = () => { startTransition(async () => { await toggleLike(post.id); }); };
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!commentText.trim()) return;
    startTransition(async () => { await addComment(post.id, commentText); setCommentText(""); });
  };
  const handleDelete = () => { if (confirm("Delete permanently?")) { startTransition(async () => { await deleteAction(post.id); }); } };

  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm transition-all ${isPending ? 'opacity-50 grayscale' : 'hover:bg-white/[0.07]'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center font-bold text-cyan-400 overflow-hidden text-sm uppercase">
            {post.user.image ? <img src={post.user.image} alt="avatar" /> : post.user.name?.[0]}
          </div>
          <div>
            <div className="flex items-center gap-2"><p className="text-sm font-bold text-white">{post.user.name}</p>{post.isVerified && <ShieldCheck size={14} className="text-cyan-400" />}</div>
            <p className="text-[11px] text-gray-500 uppercase tracking-tighter">{post.isVerified ? "Verified Expert" : "Student Story"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {currentUserId === post.userId && <button onClick={handleDelete} className="p-2 text-gray-600 hover:text-red-400 transition"><Trash2 size={16}/></button>}
          <button className="p-2 text-gray-600 hover:text-white transition"><MoreHorizontal size={18}/></button>
        </div>
      </div>

      <div className="text-[15px] leading-relaxed text-gray-200 mb-2"><MarkdownRenderer content={post.content} /></div>

      {post.mediaUrl && (
        <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-black/20">
          {post.mediaType === 'image' ? <img src={post.mediaUrl} className="w-full max-h-[450px] object-cover" /> : <video src={post.mediaUrl} controls className="w-full max-h-[450px]" />}
        </div>
      )}

      {post.externalLink && (
        <a href={post.externalLink} target="_blank" className="mt-4 flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 shrink-0"><LinkIcon size={18}/></div>
          <p className="text-xs text-blue-300 truncate font-mono">{post.externalLink}</p>
        </a>
      )}

      {post.pollData && (
        <div className="mt-4 bg-white/5 border border-white/10 p-5 rounded-xl space-y-2">
          <p className="text-[10px] font-bold text-orange-400 uppercase flex items-center gap-2"><BarChart2 size={12}/> Community Poll</p>
          {post.pollData.options.map((opt: string, i: number) => (
            <button key={i} className="w-full text-left p-3 rounded-lg border border-white/5 bg-black/30 text-xs text-gray-300 hover:border-orange-500/40 transition">
              {opt}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-8">
          <button onClick={handleLike} className={`flex items-center gap-2 text-sm font-semibold ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`}><Heart size={18} fill={isLiked ? "currentColor" : "none"} />{post._count?.likes || 0}</button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 text-sm font-semibold"><MessageSquare size={18} />{post._count?.comments || 0}</button>
        </div>
        <button className="text-gray-500 hover:text-white transition"><Share2 size={18} /></button>
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-3 items-center">
         <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0 flex items-center justify-center text-[10px] font-bold">{post.user.name?.[0]}</div>
         <div className="relative w-full">
            <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="w-full bg-black/40 rounded-full px-4 py-2 text-xs text-white border border-white/5 focus:ring-1 focus:ring-cyan-500/30 outline-none" />
            <button type="submit" disabled={isPending || !commentText.trim()} className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-400"><Send size={14}/></button>
         </div>
      </form>
    </div>
  );
}