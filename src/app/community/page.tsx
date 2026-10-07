import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createEduPost, deleteEduPost } from "@/app/actions/posts";
import MediaPostBox from "@/components/community/MediaPostBox";
import PostCard from "@/components/community/Postcard";
import { LeftSidebar, RightSidebar } from "@/components/community/SidebarComponents";
import { label } from "@/components/community/ui";

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);
  const now = new Date();

  const posts = await db.post.findMany({
    where: { OR: [{ isVerified: true }, { expiresAt: { gt: now } }] },
    include: {
      user: true,
      _count: { select: { likes: true, comments: true } },
      likes: { select: { userId: true } },
    },
    orderBy: [{ isVerified: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050f] px-4 pb-16 pt-28 text-white sm:px-6">
      {/* Static blueprint grid + ambient glow, matching the About page */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.06]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(#000,transparent 55%)" }} />
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-32 h-[480px] w-[480px] rounded-full bg-fuchsia-900/20 blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[460px] w-[460px] rounded-full bg-cyan-900/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-8">
          <p className={`${label} flex items-center gap-2`}>
            <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> COMMUNITY / LIVE FEED
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tighter sm:text-5xl">
            Learn in public, <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-500 bg-clip-text text-transparent">grow together.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
          <div className="hidden self-start lg:sticky lg:top-28 lg:block"><LeftSidebar /></div>

          <div className="space-y-6">
            <MediaPostBox session={session} createPostAction={createEduPost} placeholder={`What's on your mind, ${session?.user?.name?.split(" ")[0] || "there"}?`} />
            <section aria-label="Posts" className="space-y-4">
              {posts.length === 0 && (
                <p className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-sm text-gray-400">
                  No posts yet. Share the first story above.
                </p>
              )}
              {posts.map((post) => (
                <PostCard key={post.id} post={post} currentUserId={(session?.user as any)?.id} currentUser={{ name: session?.user?.name, image: session?.user?.image }} deleteAction={deleteEduPost} />
              ))}
            </section>
          </div>

          <div className="hidden self-start lg:sticky lg:top-28 lg:block"><RightSidebar /></div>
        </div>
      </div>
    </main>
  );
}
