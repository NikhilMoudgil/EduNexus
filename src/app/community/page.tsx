import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createEduPost, deleteEduPost } from "@/app/actions/posts";
import MediaPostBox from "@/components/community/MediaPostBox";
import PostCard from "@/components/community/Postcard";
import { LeftSidebar, RightSidebar } from "@/components/community/SidebarComponents";

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);
  const now = new Date();

  const posts = await db.post.findMany({
    where: { OR: [{ isVerified: true }, { expiresAt: { gt: now } }] },
    include: { 
      user: true, 
      _count: { select: { likes: true, comments: true } },
      likes: { select: { userId: true } } 
    },
    orderBy: [{ isVerified: "desc" }, { createdAt: "desc" }]
  });

  return (
    <div className="min-h-screen bg-[#05050f] text-white pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block"><LeftSidebar /></div>
        <div className="lg:col-span-2 space-y-6">
          <MediaPostBox session={session} createPostAction={createEduPost} placeholder={`What's on your mind, ${session?.user?.name?.split(' ')[0] || 'Prishika'}?`} />
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard key={post.id} post={post} currentUserId={(session?.user as any)?.id} deleteAction={deleteEduPost} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block"><RightSidebar /></div>
      </div>
    </div>
  );
}