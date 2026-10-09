import fs from "fs";
import path from "path";
import { parseRoadmap, RECOMMENDED, type RoadmapSummary } from "./roadmap-meta";

const DIR = path.join(process.cwd(), "src/content/roadmaps");
export const isSafeId = (id: string) => /^[a-z0-9_]+$/i.test(id);

export function getRoadmap(id: string) {
  const file = path.join(DIR, `${id}.md`);
  if (!isSafeId(id) || !fs.existsSync(file)) return null;
  return parseRoadmap(id, fs.readFileSync(file, "utf8"));
}

/** Lightweight list for the listing page (markdown bodies stripped). Recommended order first, then A-Z. */
export function getRoadmaps(): RoadmapSummary[] {
  if (!fs.existsSync(DIR)) return [];
  const list = fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).map((f) => {
    const r = parseRoadmap(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DIR, f), "utf8"));
    return { id: r.id, title: r.title, category: r.category, skills: r.skills, phases: r.phases.map(({ title, points }) => ({ title, points })) };
  });
  const rank = (id: string) => { const i = RECOMMENDED.indexOf(id.replace(/^official_/, "")); return i < 0 ? 999 : i; };
  return list.sort((a, b) => rank(a.id) - rank(b.id) || a.title.localeCompare(b.title));
}
