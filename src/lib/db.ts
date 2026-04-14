import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 1. Setup the standard 'pg' connection pool
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Create the Prisma Adapter
const adapter = new PrismaPg(pool);

// 3. Initialize the client with the adapter (REQUIRED in v7)
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;