import { pgTable, varchar, timestamp, text, decimal } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';
import { projects } from './project-schema';

export const stripeSessionPayment = pgTable('stripe_session_payment', {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull().references(() => user.id),
    projectId: varchar("project_id", { length: 36 }).notNull().references(() => projects.id),
    url: text('url').notNull(),
    status: varchar("status", { length: 20 }).default("pending").notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).default("0").notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});
