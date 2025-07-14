import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"

export const users = pgTable('users', {
    id: serial("id").primaryKey(),
    username: varchar().notNull().unique(),
    password: varchar().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
    .$onUpdate(() => new Date())
})

export const stocks = pgTable('stocks', {
    id: serial("id").primaryKey(),
    usersId: integer("users_id").notNull().references(() => 
    users.id),
    name: varchar().notNull(),
    realStock: varchar("real_stock").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const usersRelations = relations(users, 
    ({ many }) => ({
        stocks: many(stocks),
    })
)

export const stocksRelations = relations(stocks, 
    ({one}) => ({
        user: one(users, {
            fields: [stocks.usersId],
            references: [users.id]
        })
    })
)