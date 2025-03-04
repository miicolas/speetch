import { pgTable, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const stripeSessionPayment = pgTable('stripe_session_payment', {
    id: varchar("id", { length: 36 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).notNull().unique().references(() => user.id),
    url: text('url').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

