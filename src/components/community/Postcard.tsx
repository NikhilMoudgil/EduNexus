"use client";

import { useState, useTransition } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ShieldCheck, Heart, MessageSquare, Share2, MoreHorizontal, Trash2, Send, Link as LinkIcon, BarChart2 } from "lucide-react";
import { toggleLike, addComment } from "@/app/actions/posts";
import { card, label, focus } from "./ui";
import Avatar from "./Avatar";

export default function PostCard({ post, currentUserId, currentUser, deleteAction }: any) {
  const [isPending, startTransition] = useTransition();
  const [commentText, setCommentText] = useState("");
  const isLiked = post.likes?.some((like: any) => like.userId === currentUserId);

  const handleLike = () => { startTransition(async () => { await toggleLike(post.id); }); };
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!commentText.trim()) return;
    startTransition(async () => { await addComment(post.id, commentText); setCommentText(""); });
  };
  const handleDelete = () => { if (confirm("Delete permanently?")) { startTransition(async () => { await deleteAction(post.id); }); } };

  const iconBtn = `rounded-lg p-2 text-gray-500 transition ${focus}`;

  return (
    <article
      className={`${card} group p-5 transition-all duration-300 ${post.isVerified ? "border-cyan-400/25 shadow-[0_0_40px_rgba(0,217,255,0.07)]" : ""} ${isPending ? "opacity-50 grayscale" : "hover:border-white/20 hover:bg-white/[.06]"}`}
    >
      {post.isVerified && <span aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />}

      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-full" style={post.isVerified ? { boxShadow: "0 0 0 2px #05050f, 0 0 0 3px rgba(0,217,255,.6)" } : undefined}>
            <Avatar src={post.user.image} name={post.user.name} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-white">{post.user.name}</p>
              {post.isVerified && <ShieldCheck size={14} className="text-cyan-400" aria-label="Verified" />}
            </div>
            <p className={label}>{post.isVerified ? "VERIFIED EXPERT" : "STUDENT STORY"}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {currentUserId === post.userId && <button onClick={handleDelete} aria-label="Delete post" className={`${iconBtn} hover:text-red-400`}><Trash2 size={16} /></button>}
          <button aria-label="More options" className={`${iconBtn} hover:text-white`}><MoreHorizontal size={18} /></button>
        </div>
      </div>

      <div className="mb-2 text-[15px] leading-relaxed text-gray-200"><MarkdownRenderer content={post.content} /></div>

      {post.mediaUrl && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {post.mediaType === "image"
            ? <img src={post.mediaUrl} alt="Post attachment" loading="lazy" className="max-h-[450px] w-full object-cover" />
            : <video src={post.mediaUrl} controls className="max-h-[450px] w-full" />}
        </div>
      )}

      {post.externalLink && (
        <a href={post.externalLink} target="_blank" rel="noopener noreferrer" className={`mt-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/40 hover:bg-white/10 ${focus}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"><LinkIcon size={18} aria-hidden /></div>
          <p className="truncate font-mono text-xs text-blue-300">{post.externalLink}</p>
        </a>
      )}

      {post.pollData && (
        <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-orange-400"><BarChart2 size={12} aria-hidden /> COMMUNITY POLL</p>
          {post.pollData.options.map((opt: string, i: number) => (
            <button key={i} className={`w-full rounded-xl border border-white/5 bg-black/30 p-3 text-left text-xs text-gray-300 transition hover:border-orange-500/50 hover:bg-orange-500/5 ${focus}`}>
              {opt}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex gap-6">
          <button onClick={handleLike} aria-pressed={isLiked} aria-label="Like" className={`flex items-center gap-2 rounded-lg text-sm font-semibold transition ${focus} ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-400"}`}>
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />{post._count?.likes || 0}
          </button>
          <button aria-label="Comments" className={`flex items-center gap-2 rounded-lg text-sm font-semibold text-gray-500 transition hover:text-blue-400 ${focus}`}><MessageSquare size={18} />{post._count?.comments || 0}</button>
        </div>
        <button aria-label="Share" className={`${iconBtn} hover:text-white`}><Share2 size={18} /></button>
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4 flex items-center gap-3">
        <Avatar src={currentUser?.image} name={currentUser?.name} className="h-8 w-8" />
        <div className="relative w-full">
          <input aria-label="Write a comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="w-full rounded-full border border-white/5 bg-black/40 px-4 py-2 pr-10 text-xs text-white outline-none placeholder:text-gray-500 focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-500/30" />
          <button type="submit" aria-label="Send comment" disabled={isPending || !commentText.trim()} className={`absolute right-3 top-1/2 -translate-y-1/2 rounded text-cyan-500 transition hover:text-cyan-300 disabled:opacity-40 ${focus}`}><Send size={14} /></button>
        </div>
      </form>
    </article>
  );
}
