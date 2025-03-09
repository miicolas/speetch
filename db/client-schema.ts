import { pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const client = pgTable("client", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    address: text("address").notNull(),
    state: varchar("state", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    zip: varchar("zip", { length: 255 }).notNull(),
    country: varchar("country", { length: 255 }).notNull(),
    website: text("website"),
    notes: text("notes"),
    vatNumber: varchar("vat_number", { length: 255 }),
    contactName: varchar("contact_name", { length: 255 }),
    contactEmail: varchar("contact_email", { length: 255 }),
    contactPhone: varchar("contact_phone", { length: 255 }),
    contactPosition: varchar("contact_position", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
});
