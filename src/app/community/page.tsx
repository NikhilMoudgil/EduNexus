import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createEduPost, deleteEduPost } from "@/app/actions/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ShieldCheck, Trash2, Heart, MessageSquare } from "lucide-react";
import MediaPostBox from "@/components/community/MediaPostBox";

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);
  const now = new Date();

  const posts = await db.post.findMany({
    where: {
      OR: [{ isVerified: true }, { expiresAt: { gt: now } }]
    },
    include: { user: true, _count: { select: { likes: true, comments: true } } },
    orderBy: [{ isVerified: "desc" }, { createdAt: "desc" }]
  });

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#05050f] text-white pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <ShieldCheck size={18} /> Guidelines
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              Student updates and media vanish after 24 hours. Mentor announcements are permanent expert tips.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-2 space-y-8">
          
          <MediaPostBox 
            createPostAction={createEduPost} 
            placeholder={`What's on your mind, ${session?.user?.name?.split(' ')[0] || 'Prishika'}?`} 
          />

          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className={`p-6 rounded-3xl border transition-all ${post.isVerified ? "bg-cyan-500/5 border-cyan-500/30" : "bg-white/5 border-white/10"}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-cyan-400">
                      {post.user.name?.[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold flex items-center gap-2">
                        {post.user.name} 
                        {post.isVerified && <ShieldCheck size={14} className="text-cyan-400" />}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                        {post.isVerified ? "Verified Expert" : "Student Story"}
                      </p>
                    </div>
                  </div>
                  {(session?.user as any)?.id === post.userId && (
                    <form action={deleteEduPost.bind(null, post.id)}>
                      <button type="submit" className="text-gray-600 hover:text-red-400 transition"><Trash2 size={16}/></button>
                    </form>
                  )}
                </div>
                
                <MarkdownRenderer content={post.content} />

                {post.mediaUrl && post.mediaType === 'image' && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                    <img src={post.mediaUrl} alt="Post media" className="w-full object-cover max-h-[500px]" />
                  </div>
                )}
                {post.mediaUrl && post.mediaType === 'video' && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-black">
                    <video src={post.mediaUrl} controls className="w-full max-h-[500px]" />
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-white/5 flex gap-6 text-gray-500 text-xs font-bold">
                  <span className="flex items-center gap-2 hover:text-cyan-400 cursor-pointer transition">
                    <Heart size={16} /> {post._count.likes}
                  </span>
                  <span className="flex items-center gap-2 hover:text-purple-400 cursor-pointer transition">
                    <MessageSquare size={16} /> {post._count.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}