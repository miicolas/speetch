  import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const newsletterTable = pgTable('newsletter_table', {
  id: serial().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});


