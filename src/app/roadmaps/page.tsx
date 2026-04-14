// 1. 🚀 THE MISSING IMPORTS
import fs from "fs";
import path from "path";
import Link from "next/link";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RoadmapSearch from "@/components/roadmaps/RoadmapSearch";

// 2. THE INTERFACE
interface Roadmap {
  id: string;
  title: string;
  type: string;
  description: string;
  icon: string;
  color: string;
}

// 3. THE STYLE DEFINITIONS (Required for your map logic)
const featuredStyles: Record<string, { icon: string, color: string, description: string }> = {
  "official_flutter": { icon: "fab fa-flutter", color: "from-blue-600 to-cyan-500", description: "Complete path from beginner to advanced dApp development." },
  "official_devops": { icon: "fas fa-infinity", color: "from-green-600 to-teal-500", description: "Master CI/CD, cloud infrastructure, and automation tools." },
  "official_react": { icon: "fab fa-react", color: "from-blue-500 to-indigo-600", description: "Build scalable user interfaces using modern React best practices." },
  "official_frontend": { icon: "fas fa-code", color: "from-purple-600 to-pink-500", description: "The core foundations of the web: HTML, CSS, JavaScript, and beyond." },
  "official_backend": { icon: "fas fa-server", color: "from-orange-600 to-red-500", description: "Deep dive into PostgreSQL and server logic." },
  "official_android_kotlin": { icon: "fab fa-android", color: "from-emerald-600 to-green-500", description: "Build native mobile applications using Kotlin and Jetpack Compose." },
};

export default async function RoadmapsListingPage() {
  const session = await getServerSession(authOptions);
  
  const roadmapsDir = path.join(process.cwd(), "src/content/roadmaps");
  let allOfficialRoadmaps: Roadmap[] = [];

  if (fs.existsSync(roadmapsDir)) {
    const files = fs.readdirSync(roadmapsDir);
    
    allOfficialRoadmaps = files
      .filter(file => file.endsWith(".md"))
      .map((file): Roadmap => {
        const id = file.replace(".md", "");
        const style = featuredStyles[id];
        
        const title = id
          .replace("official_", "")
          .split("_")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        return {
          id,
          title,
          type: "Official Guide",
          description: style?.description || `Master the core principles of ${title} in this EduNexus Pro Guide.`,
          icon: style?.icon || "fas fa-book-open",
          color: style?.color || "from-gray-700 to-slate-900",
        };
      });
  }

  // Database Fetch for AI Roadmap history
  let userRoadmaps: any[] = [];
  if (session?.user) {
    const userId = (session.user as any).id;
    userRoadmaps = await db.combinedPlan.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-24 pb-12 px-6 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 text-left">
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">Roadmaps</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl font-light leading-relaxed">
            Step-by-step learning paths. Explore our library of 100+ domains or view your custom AI generations.
          </p>
        </div>

        {/* MOVED: AI CTA SECTION (Now at the top) */}
        <div className="mb-12 bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Didn't find what you need?</h3>
            <p className="text-gray-400 leading-relaxed font-light">
              Build your customized roadmap with our powerful AI generator.
            </p>
          </div>
          <Link href="/generate">
            <button className="w-full md:w-auto bg-linear-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all font-bold">
              Generate AI Roadmap
            </button>
          </Link>
        </div>

        {/* SEARCH & LISTING UI */}
        <RoadmapSearch 
          officialRoadmaps={allOfficialRoadmaps} 
          userRoadmaps={userRoadmaps} 
          isLoggedIn={!!session} 
        />

      </div>
    </div>
  );
}