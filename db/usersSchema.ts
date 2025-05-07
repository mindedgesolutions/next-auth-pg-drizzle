import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  twoFactorSecret: text('2fa_secret'),
  twoFactorActivated: boolean('2fa_activated').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
