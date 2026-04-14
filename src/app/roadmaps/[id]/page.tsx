import fs from "fs";
import path from "path";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function ViewRoadmapPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // 🛡️ LANE 1: THE DISK CHECK (Official Roadmaps)
  // This looks for files like "official_flutter.md"
  const roadmapDir = path.join(process.cwd(), "src/content/roadmaps");
  const filePath = path.join(roadmapDir, `${id}.md`);

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const title = id.replace("official_", "").split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    return (
      <div className="relative min-h-screen bg-[#05050f] text-white pt-28 pb-12 px-6">
        <div className="fixed top-[-10%] right-[-10%] w-125 h-125 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Official Pro Guide
            </span>
            <h1 className="text-4xl font-black tracking-tighter">{title}</h1>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl">
            <MarkdownRenderer content={fileContent} />
          </div>
        </div>
      </div>
    );
  }

  // 🛡️ LANE 2: THE DATABASE CHECK (Saved/AI Roadmaps)
  // If no file exists, we look for your existing database entries
  const roadmap = await db.combinedPlan.findUnique({
    where: { id: id },
  });

  // 🛡️ LANE 3: THE SECURITY FALLBACK
  // If it's not on the disk AND not in the DB, only then do we 404
  if (!roadmap) {
    return notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-28 pb-12 px-6">
      <div className="fixed top-[-10%] right-[-10%] w-125 h-125 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter mb-4">{roadmap.title}</h1>
          <p className="text-gray-400 font-medium text-sm">
            Saved on {new Date(roadmap.createdAt).toLocaleDateString('en-IN', { 
              day: 'numeric', month: 'long', year: 'numeric' 
            })}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl">
          <MarkdownRenderer content={roadmap.plan || "Content not available."} />
        </div>
      </div>
    </div>
  );
}