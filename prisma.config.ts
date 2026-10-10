// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The CLI uses the direct / session-mode URL (port 5432).
    // The fallback means `prisma generate` still works on a build machine (such as Vercel)
    // where DIRECT_URL was never added. `env("DIRECT_URL")` throws in that case.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});