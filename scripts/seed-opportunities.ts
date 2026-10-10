// Run with: npx tsx --env-file=.env scripts/seed-opportunities.ts
// These are sample listings for development only. Replace with real data / the ingest cron.
import { db } from "../src/lib/db";

const daysFromNow = (d: number) => new Date(Date.now() + d * 86_400_000);

const samples = [
  {
    externalId: "seed-1",
    title: "Frontend Developer Intern",
    company: "Acme Labs",
    type: "INTERNSHIP",
    location: "Bengaluru",
    remote: true,
    stipendMin: 15000,
    stipendMax: 25000,
    tags: ["React", "Next.js", "TypeScript"],
    applyUrl: "https://example.com/apply/1",
    deadline: daysFromNow(2),
  },
  {
    externalId: "seed-2",
    title: "Data Analyst Intern",
    company: "Northwind Analytics",
    type: "INTERNSHIP",
    location: "Pune",
    remote: false,
    stipendMin: 10000,
    stipendMax: 10000,
    tags: ["SQL", "Python", "Power BI"],
    applyUrl: "https://example.com/apply/2",
    deadline: daysFromNow(9),
  },
  {
    externalId: "seed-3",
    title: "Backend Engineering Intern",
    company: "Globex",
    type: "INTERNSHIP",
    location: "Remote",
    remote: true,
    stipendMin: 30000,
    stipendMax: 45000,
    tags: ["Node.js", "PostgreSQL", "Docker"],
    applyUrl: "https://example.com/apply/3",
    deadline: null,
  },
  {
    externalId: "seed-4",
    title: "Smart India Hackathon 2026",
    company: "Ministry of Education",
    type: "HACKATHON",
    location: "Multiple cities",
    remote: false,
    stipendMin: null,
    stipendMax: null,
    tags: ["Open innovation", "Team of 6"],
    applyUrl: "https://example.com/apply/4",
    deadline: daysFromNow(21),
  },
  {
    externalId: "seed-5",
    title: "Product Strategy Case Challenge",
    company: "Unstop",
    type: "CASE_COMPETITION",
    location: "Online",
    remote: true,
    stipendMin: null,
    stipendMax: null,
    tags: ["Strategy", "Product"],
    applyUrl: "https://example.com/apply/5",
    deadline: daysFromNow(5),
  },
  {
    externalId: "seed-6",
    title: "Associate Software Engineer",
    company: "Initech",
    type: "JOB",
    location: "Hyderabad",
    remote: false,
    stipendMin: 600000,
    stipendMax: 900000,
    tags: ["Java", "Spring", "AWS"],
    applyUrl: "https://example.com/apply/6",
    deadline: daysFromNow(30),
  },
];

async function main() {
  for (const s of samples) {
    await db.opportunity.upsert({
      where: { source_externalId: { source: "manual", externalId: s.externalId } },
      update: {},
      create: { ...s, source: "manual", currency: "INR", type: s.type as any },
    });
  }
  console.log(`Seeded ${samples.length} opportunities`);
}

main().finally(() => db.$disconnect());
