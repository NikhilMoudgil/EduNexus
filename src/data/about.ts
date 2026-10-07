import {
  Swords, Database, Timer, BarChart3, Briefcase, Bot, ScanSearch, LineChart, Handshake,
  Cpu, FlaskConical, Brain, Network, type LucideIcon,
} from "lucide-react";

export const founder = {
  name: "Nikhil Moudgil",
  role: "Founder & Full-Stack Engineer",
  image: "/team/nikhil.png", // replace this file to change the avatar
  color: "#00d9ff",
  bio: "Building EduNexus as an engineering-first platform for turning technical learning into measurable career readiness.",
  statement: "EduNexus is designed, architected and shipped by one engineer: schemas, state engine, interface and all.",
  skills: ["Full-Stack Development", "System Design", "AI", "Product Engineering", "UI/UX", "Developer Tools"],
  links: [
    { label: "GitHub", href: "https://github.com/NikhilMoudgil" },     // TODO: your profile
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nikhil-moudgil-995408270/" },  // TODO: your profile
  ],
};

export type Status = "LIVE" | "IN PROGRESS" | "PLANNED";

// NOTE: statuses are assumptions. Edit them so they stay true.
export const products: {
  name: string; category: string; description: string; tags: string[];
  status: Status; color: string; icon: LucideIcon; image?: string; // e.g. "/products/dev-arena.png"
}[] = [
  { name: "Dev Arena", category: "Technical Simulation", description: "Timed technical challenges that recreate interview pressure.", tags: ["Algorithms", "Coding", "Timed rounds"], status: "LIVE", color: "#00d9ff", icon: Swords },
  { name: "SQL Sniper", category: "Arena Track", description: "Write the right query before the clock runs out.", tags: ["SQL", "Databases"], status: "LIVE", color: "#d946ef", icon: Database },
  { name: "Big-O Blitz", category: "Arena Track", description: "Rapid-fire complexity analysis under time pressure.", tags: ["Complexity", "DSA"], status: "LIVE", color: "#f5b942", icon: Timer },
  { name: "Skill Intelligence", category: "Analytics", description: "Skill bars and experience metrics that make progress visible.", tags: ["Skill tracking", "Metrics"], status: "LIVE", color: "#22c55e", icon: BarChart3 },
  { name: "Placement Tracker", category: "Career Ops", description: "Applications, roles and status updates in one place.", tags: ["Applications", "Status"], status: "LIVE", color: "#00d9ff", icon: Briefcase },
  { name: "AI Mentor", category: "AI Guidance", description: "Gemini-driven feedback tailored to how you actually solve.", tags: ["Gemini", "Feedback"], status: "PLANNED", color: "#d946ef", icon: Bot },
  { name: "Code Review", category: "AI Guidance", description: "Personalised code reviews that explain what to improve.", tags: ["Reviews", "Gemini"], status: "PLANNED", color: "#f5b942", icon: ScanSearch },
  { name: "Career Analytics", category: "Intelligence", description: "Turn performance data into career insight.", tags: ["Insights", "Trends"], status: "IN PROGRESS", color: "#22c55e", icon: LineChart },
  { name: "Recruitment Intelligence", category: "Opportunity", description: "Let companies discover top Arena performers.", tags: ["Scouting", "Integrations"], status: "PLANNED", color: "#00d9ff", icon: Handshake },
];

export const flow = ["Academics", "Skills", "Simulation", "Intelligence", "Opportunity"];

export const problems = ["Interview pressure", "Real engineering practice", "Feedback loops", "Skill visibility", "Career intelligence", "Structured preparation"];

export const pillars: { title: string; text: string; meta: string; color: string; icon: LucideIcon }[] = [
  { title: "Engineering First", text: "Built around practical engineering skills, not passive learning.", meta: "Prisma · PostgreSQL · Supabase", color: "#00d9ff", icon: Cpu },
  { title: "Simulation Over Theory", text: "Practice under realistic technical constraints.", meta: "Timed rounds · Scored output", color: "#d946ef", icon: FlaskConical },
  { title: "Intelligence Driven", text: "Turn performance into useful career insight.", meta: "Skill bars · Experience metrics", color: "#f5b942", icon: Brain },
  { title: "Career Connected", text: "Bridge preparation with real opportunities.", meta: "Tracker · Recruiter integrations", color: "#22c55e", icon: Network },
];

export const journey = [
  { title: "The Problem", text: "Students struggle to turn academic knowledge into interview-ready skills." },
  { title: "The Idea", text: "One unified technical preparation ecosystem." },
  { title: "The Arena", text: "Realistic developer simulations: Big-O Blitz, SQL Sniper." },
  { title: "Intelligence", text: "Analytics, AI guidance and personalised feedback." },
  { title: "The Future", text: "Connecting skilled candidates with meaningful opportunities." },
];

// Derived from real data so the numbers stay true. Override freely.
export const stats = [
  { value: 1, label: "Core builder" },
  { value: products.length, label: "Platform modules" },
  { value: products.filter((p) => p.status === "LIVE").length, label: "Modules live" },
  { value: 2, label: "Arena tracks" },
];
