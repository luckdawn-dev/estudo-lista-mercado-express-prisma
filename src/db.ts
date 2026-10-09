import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7+: the connection URL lives in prisma.config.ts (for Migrate/CLI)
// and the runtime connection is passed to PrismaClient via a driver adapter.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const listaMercadoPrisma = new PrismaClient({ adapter });
