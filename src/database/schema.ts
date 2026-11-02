import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: varchar('name', { length: 100 }).notNull(),

  slug: varchar('slug', { length: 120 }).notNull().unique(),

  description: text('description'),

  isActive: boolean('is_active').notNull().default(true),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export type Users = typeof users.$inferSelect;

export type NewUsers = typeof users.$inferInsert;
