"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Image as ImageIcon, Video, Link as LinkIcon, BarChart2, Loader2, X, Plus } from "lucide-react";
import { card, focus } from "./ui";
import Avatar from "./Avatar";

export default function MediaPostBox({ session, createPostAction, placeholder }: any) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showLink, setShowLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [isUploading, setIsUploading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const addOption = () => { if (pollOptions.length < 4) setPollOptions([...pollOptions, ""]); };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !file && !linkUrl && !pollOptions[0]) return;
    setIsUploading(true);

    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      const { error } = await supabase.storage.from('community-media').upload(filePath, file);

      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('community-media').getPublicUrl(filePath);
        mediaUrl = publicUrl;
        mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      }
    }

    await createPostAction({
      content,
      mediaUrl,
      mediaType,
      externalLink: linkUrl,
      pollData: showPoll ? { options: pollOptions.filter(o => o.trim() !== "") } : null
    });

    setContent(""); setFile(null); setLinkUrl(""); setShowLink(false); setShowPoll(false); setPollOptions(["", ""]);
    setIsUploading(false);
  };

  const tool = `flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-400 transition hover:bg-white/5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-cyan-300 ${focus}`;
  const disabled = isUploading || (!content && !file && !linkUrl && !pollOptions[0]);

  return (
    <div className={`${card} p-4 transition-colors focus-within:border-cyan-400/40 sm:p-5`}>
      <span aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <form onSubmit={handleUpload} className="space-y-3">
        <div className="flex gap-3 sm:gap-4">
          <Avatar src={session?.user?.image} name={session?.user?.name} />
          <div className="w-full space-y-2">
            <label htmlFor="community-post" className="sr-only">Write a post</label>
            <textarea
              id="community-post" value={content} onChange={(e) => setContent(e.target.value)} placeholder={placeholder}
              className="w-full resize-none rounded-2xl bg-black/30 p-4 text-base text-white outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-cyan-500/50" rows={2}
            />

            {showLink && (
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 animate-in slide-in-from-top-1">
                <LinkIcon size={14} className="ml-2 text-blue-400" aria-hidden />
                <input type="url" aria-label="Link URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." className="w-full bg-transparent text-xs text-blue-300 outline-none" />
                <button type="button" aria-label="Remove link" className={`rounded p-1 ${focus}`} onClick={() => { setShowLink(false); setLinkUrl(""); }}><X size={14} /></button>
              </div>
            )}

            {showPoll && (
              <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-4 animate-in slide-in-from-top-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-wider text-orange-400">POLL OPTIONS</span>
                  <button type="button" aria-label="Remove poll" className={`rounded p-1 ${focus}`} onClick={() => setShowPoll(false)}><X size={14} /></button>
                </div>
                {pollOptions.map((opt, i) => (
                  <input key={i} aria-label={`Poll option ${i + 1}`} value={opt} onChange={(e) => { const n = [...pollOptions]; n[i] = e.target.value; setPollOptions(n); }} placeholder={`Option ${i + 1}`} className="w-full rounded-lg border border-white/5 bg-black/40 px-3 py-2 text-xs text-white outline-none focus:border-orange-400/50" />
                ))}
                {pollOptions.length < 4 && <button type="button" onClick={addOption} className={`flex items-center gap-1 rounded text-xs font-semibold text-gray-400 hover:text-orange-400 ${focus}`}><Plus size={12} /> Add option</button>}
              </div>
            )}

            {file && (
              <div className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2">
                <span className="max-w-[200px] truncate text-xs text-cyan-300">File: {file.name}</span>
                <button type="button" aria-label="Remove file" className={`rounded p-1 ${focus}`} onClick={() => setFile(null)}><X size={14} /></button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
          <div className="flex flex-wrap gap-1">
            <label className={`${tool} hover:text-cyan-300`}><ImageIcon size={18} aria-hidden /> Photo<input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>
            <label className={`${tool} hover:text-fuchsia-300`}><Video size={18} aria-hidden /> Video<input type="file" accept="video/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>
            <button type="button" aria-pressed={showLink} onClick={() => setShowLink(!showLink)} className={`${tool} hover:text-blue-300`}><LinkIcon size={18} aria-hidden /> Link</button>
            <button type="button" aria-pressed={showPoll} onClick={() => setShowPoll(!showPoll)} className={`${tool} hover:text-orange-300`}><BarChart2 size={18} aria-hidden /> Poll</button>
          </div>
          <button disabled={disabled} className={`rounded-full bg-cyan-400 px-6 py-2 text-sm font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 ${focus}`}>
            {isUploading ? <Loader2 className="animate-spin" size={16} aria-label="Posting" /> : "Post story"}
          </button>
        </div>
      </form>
    </div>
  );
}
