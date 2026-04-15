"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Image as ImageIcon, Video, Link as LinkIcon, BarChart2, Zap, Loader2, X, Plus } from "lucide-react";

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

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
      <form onSubmit={handleUpload} className="space-y-3">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold shrink-0">
            {session?.user?.name?.[0] || "P"}
          </div>
          <div className="w-full space-y-2">
            <textarea 
              value={content} onChange={(e) => setContent(e.target.value)} placeholder={placeholder}
              className="w-full bg-black/20 rounded-2xl p-4 focus:ring-1 focus:ring-cyan-500/50 outline-none text-base text-white resize-none" rows={2}
            />

            {showLink && (
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10 animate-in slide-in-from-top-1">
                <LinkIcon size={14} className="text-blue-400 ml-2" />
                <input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." className="bg-transparent text-xs text-blue-300 w-full outline-none" />
                <button type="button" onClick={() => { setShowLink(false); setLinkUrl(""); }}><X size={14} /></button>
              </div>
            )}

            {showPoll && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2 animate-in slide-in-from-top-1">
                <div className="flex justify-between items-center mb-1"><span className="text-[10px] font-bold text-orange-400 uppercase">Poll Options</span><button type="button" onClick={() => setShowPoll(false)}><X size={14} /></button></div>
                {pollOptions.map((opt, i) => (
                  <input key={i} value={opt} onChange={(e) => { const n = [...pollOptions]; n[i] = e.target.value; setPollOptions(n); }} placeholder={`Option ${i+1}`} className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none" />
                ))}
                {pollOptions.length < 4 && <button type="button" onClick={addOption} className="text-[10px] font-bold text-gray-500 hover:text-orange-400 flex items-center gap-1"><Plus size={12}/> Add Option</button>}
              </div>
            )}

            {file && <div className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/30 px-3 py-2 rounded-xl"><span className="text-xs text-cyan-400 truncate max-w-[200px]">File: {file.name}</span><button type="button" onClick={() => setFile(null)}><X size={14} /></button></div>}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
          <div className="flex gap-4 text-gray-400">
            <label className="cursor-pointer hover:text-cyan-400 transition flex items-center gap-1 text-xs"><ImageIcon size={18} /> Photo<input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>
            <label className="cursor-pointer hover:text-purple-400 transition flex items-center gap-1 text-xs"><Video size={18} /> Video<input type="file" accept="video/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>
            <button type="button" onClick={() => setShowLink(!showLink)} className="hover:text-blue-400 transition flex items-center gap-1 text-xs"><LinkIcon size={18} /> Link</button>
            <button type="button" onClick={() => setShowPoll(!showPoll)} className="hover:text-orange-400 transition flex items-center gap-1 text-xs"><BarChart2 size={18} /> Poll</button>
          </div>
          <button disabled={isUploading || (!content && !file && !linkUrl && !pollOptions[0])} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-bold transition">
            {isUploading ? <Loader2 className="animate-spin" size={16} /> : "Post Story"}
          </button>
        </div>
      </form>
    </div>
  );
}