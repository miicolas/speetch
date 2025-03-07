import { pgTable, varchar, timestamp, text, integer } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';
import { client } from './client-schema';

export const projects = pgTable('projects', {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).references(() => user.id),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    clientId: varchar("client_id", { length: 36 }).references(() => client.id),
    amount: integer("amount").notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    paymentDate: timestamp("payment_date", { withTimezone: true }).notNull(),
    paymentMethod: varchar("payment_method", { length: 255 }).notNull(),
    paymentStatus: varchar("payment_status", { length: 255 }).notNull(),
    endDate: text("end_date").notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});