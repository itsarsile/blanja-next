import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
    boolean,
    pgEnum,
  } from "drizzle-orm/pg-core";
  

  export const userRoleEnum = pgEnum("role", ['admin', 'seller', 'customer'])
  export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    role: userRoleEnum('role'),
    password: text('password').notNull(),
    verified: boolean('verified').default(false),
    verification_code: text('verification_code').notNull().unique()
  })

  export const store_profile = pgTable('store_profile', {
    id: serial('id').primaryKey(),
    store_name: text('store_name').notNull(),
    store_phone: text('store_phone').notNull(),
    user_id: integer('user_id').references(() => users.id)
  })

