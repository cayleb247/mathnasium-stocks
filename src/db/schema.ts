import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial("id").primaryKey(),
    userName: varchar("user_name").notNull(),
    email: varchar().notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})