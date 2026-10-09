export type CatKey = "dev" | "ai" | "cloud" | "sec" | "design" | "biz" | "hw";

// Categories are not stored in the .md files, so they are assigned here by roadmap id.
// Anything not listed falls into "hw" (Hardware & Science). Edit freely.
export const CATEGORIES: { key: CatKey; label: string; color: string; ids: string }[] = [
  { key: "dev", label: "Development", color: "#22d3ee", ids: "android_kotlin backend blockchain_dev c_plus_plus flutter frontend fullstack golang graphql grpc ios_swift java javascript python react_native rest_api_design rust system_design typescript game_dev_unity godot_engine unreal_engine ar_vr_development microservices" },
  { key: "ai", label: "AI & Data", color: "#a78bfa", ids: "ai_ethics big_data business_intelligence computer_vision data_engineering data_science deep_learning machine_learning natural_language_processing mongodb mysql postgresql redis sqlite sql_mastery supabase bioinformatics" },
  { key: "cloud", label: "Cloud & DevOps", color: "#60a5fa", ids: "aws cloud_native_architecture devsecops docker finops kubernetes linux_administration sre terraform" },
  { key: "sec", label: "Security", color: "#fbbf24", ids: "app_sec cloud_security cryptography cyber_law data_privacy ethical_hacking network_security penetration_testing soc_analyst" },
  { key: "design", label: "Design & Media", color: "#f472b6", ids: "3d_modelling brand_design figma_mastery graphic_design interaction_design motion_graphics ui_ux photography_digital podcast_production video_production vfx_compositing game_audio game_design music_theory_for_producers scriptwriting" },
  { key: "biz", label: "Business", color: "#4ade80", ids: "agile_scrum content_strategy copywriting customer_success e_commerce_strategy edtech_foundations fintech growth_hacking hr_tech it_governance product_management product_marketing project_management sales_engineering seo social_media_marketing youtube_strategy" },
  { key: "hw", label: "Hardware & Science", color: "#fb923c", ids: "" },
];

// Curated "Recommended" order (shown first, then the rest A-Z). Edit to taste.
export const RECOMMENDED = ["fullstack", "frontend", "backend", "python", "machine_learning", "system_design", "ui_ux", "product_management"];

export type RoadmapSummary = {
  id: string; title: string; category: CatKey; skills: string[];
  phases: { title: string; points: string[] }[];
};

const ACRONYMS = /\b(aws|sql|ui|ux|ai|api|grpc|seo|sre|soc|ar|vr|fpga|hr|it|f1|3d)\b/gi;
export const prettify = (s: string) =>
  s.replace(/^official_/, "").split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(ACRONYMS, (m) => m.toUpperCase());

export function categorize(id: string): CatKey {
  const slug = id.replace(/^official_/, "");
  return CATEGORIES.find((c) => c.ids.split(" ").includes(slug))?.key ?? "hw";
}

export function parseRoadmap(id: string, rawText: string) {
  const raw = rawText.replace(/\r\n/g, "\n");
  const fm = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  const meta: Record<string, string> = {};
  fm?.[1].split("\n").forEach((l) => { const m = /^(\w+):\s*"?(.*?)"?\s*$/.exec(l); if (m) meta[m[1]] = m[2]; });
  const body = fm ? raw.slice(fm[0].length) : raw;
  const [intro, ...sections] = body.split(/^(?=## )/m);
  const phases = sections.map((s) => {
    const lines = s.split("\n");
    return {
      title: lines[0].replace(/^##\s*(Phase\s*\d+:\s*)?/i, "").trim(),
      points: lines.filter((l) => /^\*\s+\*\*/.test(l)).map((l) => (/\*\*(.+?)\*\*/.exec(l)?.[1] ?? "").replace(/:$/, "")),
      markdown: s,
    };
  });
  return {
    id,
    title: meta.title ? meta.title.replace(ACRONYMS, (m) => m.toUpperCase()) : prettify(id),
    category: categorize(id),
    skills: meta.skills ? meta.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
    intro: intro.replace(/^#\s.*\n/m, "").trim(),
    phases,
  };
}
