"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Image as ImageIcon, Video, Zap, Loader2 } from "lucide-react";

export default function MediaPostBox({ 
  createPostAction, 
  placeholder 
}: { 
  createPostAction: any, 
  placeholder: string 
}) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !file) return;
    setIsUploading(true);

    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('community-media')
        .upload(filePath, file);

      if (!error) {
        const { data: { publicUrl } } = supabase.storage
          .from('community-media')
          .getPublicUrl(filePath);
        
        mediaUrl = publicUrl;
        mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      }
    }

    await createPostAction({ content, mediaUrl, mediaType });
    
    setContent("");
    setFile(null);
    setIsUploading(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
      <form onSubmit={handleUpload}>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-gray-600 resize-none text-white"
          rows={3}
        />
        
        {file && (
          <div className="mt-2 text-sm text-cyan-400">
            Selected: {file.name}
          </div>
        )}

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
          <div className="flex gap-4 text-gray-400">
            <label className="cursor-pointer hover:text-cyan-400 transition flex items-center gap-2">
              <ImageIcon size={20} />
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
            <label className="cursor-pointer hover:text-purple-400 transition flex items-center gap-2">
              <Video size={20} />
              <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>

          <button 
            disabled={isUploading}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black px-6 py-2 rounded-xl font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />} 
            {isUploading ? "Uploading..." : "Post Story"}
          </button>
        </div>
      </form>
    </div>
  );
}