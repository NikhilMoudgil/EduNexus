import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  // Prisma 7 needs a driver adapter, so the 'pg' pool is created here, and only when no client exists yet.
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Every serverless instance on Vercel keeps its own pool. A small cap stops many
    // instances from together using up the database's connection limit.
    max: process.env.NODE_ENV === "production" ? 5 : 10,
  });
  pool.on("error", (err) => console.error("Unexpected database pool error", err));

  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;