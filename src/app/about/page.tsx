import { 
  Terminal, Code2, Database, Layout, ShieldCheck, Zap, 
  Target, Rocket, Users, BarChart3, Sparkles 
} from "lucide-react";

export default function AboutUs() {
  const team = [
    {
      name: "Nikhil Moudgil",
      role: "Lead Architect & Full-Stack Engineer",
      desc: "The technical architect of the EduNexus ecosystem. Nikhil engineered the core modular structure, designed the Prisma schemas, and authored the state engine powering the Dev Arena.",
      icon: <Terminal className="w-6 h-6 text-fuchsia-400" />,
      color: "fuchsia",
    },
    {
      name: "Ritik Sharma",
      role: "Frontend Developer & UI/UX Designer",
      desc: "The aesthetic soul of the project. Ritik transformed complex data structures into an intuitive interface, leveraging Tailwind CSS to create the signature EduNexus dark-neon identity.",
      icon: <Layout className="w-6 h-6 text-cyan-400" />,
      color: "cyan",
    },
    {
      name: "Varun Rana",
      role: "Backend & Systems Engineer",
      desc: "The guardian of infrastructure. Varun specialized in the seamless integration of Supabase and PostgreSQL, ensuring that user data and authentication remain robust and secure.",
      icon: <Database className="w-6 h-6 text-green-400" />,
      color: "green",
    },
    {
      name: "Abhishek Sharma",
      role: "Content Engineer & QA Specialist",
      desc: "The precision expert. Abhishek bridged the gap between code and curriculum, designing the technical logic for gamified scenarios and ensuring every module met production standards.",
      icon: <ShieldCheck className="w-6 h-6 text-orange-400" />,
      color: "orange",
    }
  ];

  const colorMap: Record<string, string> = {
    fuchsia: "border-fuchsia-500/30 hover:border-fuchsia-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)]",
    cyan: "border-cyan-500/30 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]",
    green: "border-green-500/30 hover:border-green-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]",
    orange: "border-orange-500/30 hover:border-orange-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]",
  };

  const bgMap: Record<string, string> = {
    fuchsia: "bg-fuchsia-500/10",
    cyan: "bg-cyan-500/10",
    green: "bg-green-500/10",
    orange: "bg-orange-500/10",
  };

  return (
    <div className="relative min-h-screen bg-[#05050f] text-white pt-28 pb-20 px-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-900/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- SECTION 1: HERO --- */}
        <div className="text-center max-w-4xl mx-auto mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-8">
            <Rocket className="w-4 h-4" /> Next-Gen Placement Hub
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            Elevating the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">Standard of Preparedness.</span>
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed font-medium">
            EduNexus is a commitment to bridging the gap between academic theory and industry excellence. We provide the tools for students to own their professional destiny.
          </p>
        </div>

        {/* --- SECTION 2: WHY CHOOSE US --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6">
            <h2 className="text-4xl font-black tracking-tight">Why Choose <span className="text-cyan-400">EduNexus?</span></h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Data-Driven Progress</h4>
                  <p className="text-gray-400 text-sm">Visualize your technical evolution with real-time skill bars and experience metrics.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-fuchsia-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Interview Simulation</h4>
                  <p className="text-gray-400 text-sm">The Dev Arena simulates real pressure through timed challenges like Big-O Blitz and SQL Sniper.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Centralized Opportunity</h4>
                  <p className="text-gray-400 text-sm">Manage all your applications, job roles, and status updates in one secure location.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 flex items-center justify-center p-12 bg-gradient-to-br from-white/5 to-transparent">
            <div className="relative text-center space-y-4">
              <Sparkles className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
              <h3 className="text-3xl font-black">Built by Techies,<br />For Techies.</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">We understand the struggle of placements because we are in the arena with you.</p>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: VISION --- */}
        <div className="text-center mb-32 p-16 bg-white/5 border border-white/10 rounded-[4rem]">
          <h2 className="text-5xl font-black mb-8 tracking-tighter flex items-center justify-center gap-4">
            <Target className="w-10 h-10 text-orange-500" /> Vision for the Future
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
            <div className="space-y-3">
              <span className="text-orange-500 font-bold text-xs uppercase tracking-widest">Phase 01</span>
              <h4 className="text-xl font-bold">AI Guidance</h4>
              <p className="text-gray-400 text-sm">Implementing Gemini-driven analysis for personalized code reviews.</p>
            </div>
            <div className="space-y-3">
              <span className="text-cyan-500 font-bold text-xs uppercase tracking-widest">Phase 02</span>
              <h4 className="text-xl font-bold">Leaderboards</h4>
              <p className="text-gray-400 text-sm">Expanding the Dev Arena to include multi-player competitive rankings.</p>
            </div>
            <div className="space-y-3">
              <span className="text-fuchsia-500 font-bold text-xs uppercase tracking-widest">Phase 03</span>
              <h4 className="text-xl font-bold">Recruitment</h4>
              <p className="text-gray-400 text-sm">Direct integrations for companies to scout top Arena performers.</p>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: TEAM (STANDARD GRID) --- */}
        <div className="mb-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">The Development Core</h2>
            <p className="text-gray-400">The engineers behind the EduNexus architecture.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div 
                key={member.name} 
                className={`group bg-white/5 border rounded-[2.5rem] p-10 transition-all duration-500 ${colorMap[member.color]}`}
              >
                <div className="flex flex-col gap-6">
                  <div className={`w-16 h-16 rounded-[1.2rem] ${bgMap[member.color]} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    {member.icon}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-black text-white">{member.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- FINAL CALL TO ACTION --- */}
        <div className="bg-gradient-to-r from-cyan-900/20 via-fuchsia-900/20 to-blue-900/20 border border-white/10 rounded-[3.5rem] p-16 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-6 tracking-tighter">Join the Revolution.</h2>
            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto font-medium">
              Ready to transform your career journey? Start your training in the Arena today.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <div className="text-center md:text-left">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Platform</span>
                <a href="https://www.edunexus.io" className="text-xl font-black text-cyan-400 hover:text-white transition-colors">www.edunexus.io</a>
              </div>
              <div className="text-center md:text-left">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Contact</span>
                <a href="mailto:hello@edunexus.io" className="text-xl font-black text-fuchsia-400 hover:text-white transition-colors">hello@edunexus.io</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}