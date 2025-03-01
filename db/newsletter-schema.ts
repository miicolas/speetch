import { int, mysqlTable, serial, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const newsletterTable = mysqlTable('newsletter_table', {
  id: serial().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});


