import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

dotenv.config();

const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
export const db = drizzle(sql);