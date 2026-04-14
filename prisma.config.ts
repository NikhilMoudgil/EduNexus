// prisma.config.ts
import 'dotenv/config'; // 🚀 ADD THIS EXACT LINE AT THE TOP
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // 🛡️ CHANGED: Use DIRECT_URL here so the CLI builds tables without the "s1" error
    url: env("DIRECT_URL"),
  },
});