// Drizzle example with the Neon serverless driver
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);

export { db }