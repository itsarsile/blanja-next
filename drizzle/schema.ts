import { pgTable, pgEnum, varchar, timestamp, text, integer, serial, foreignKey, real, unique, boolean, uuid } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])
export const role = pgEnum("role", ['customer', 'seller', 'admin'])


export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const categories = pgTable("categories", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
});

export const products = pgTable("products", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	brand: text("brand").notNull(),
	description: text("description").notNull(),
	price: integer("price").notNull(),
	stock: integer("stock").notNull(),
	rating: real("rating"),
	categoryId: integer("category_id").references(() => categories.id),
	storeId: integer("store_id").references(() => storeProfile.id),
});

export const reviews = pgTable("reviews", {
	id: serial("id").primaryKey().notNull(),
	rating: real("rating").notNull(),
	message: text("message").notNull(),
	productId: integer("product_id").references(() => products.id),
});

export const storeProfile = pgTable("store_profile", {
	id: serial("id").primaryKey().notNull(),
	storeName: text("store_name").notNull(),
	storePhone: text("store_phone").notNull(),
	userId: integer("user_id").references(() => users.id),
});

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	email: text("email"),
	name: text("name"),
	role: role("role"),
	password: text("password").notNull(),
	verified: boolean("verified").default(false),
	verificationCode: text("verification_code").notNull(),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
		usersVerificationCodeUnique: unique("users_verification_code_unique").on(table.verificationCode),
	}
});

export const carts = pgTable("carts", {
	id: uuid("id").primaryKey().notNull(),
	userId: integer("user_id").references(() => users.id),
	productId: integer("product_id").references(() => products.id),
});

export const cartItems = pgTable("cart_items", {
	id: uuid("id").primaryKey().notNull(),
	productId: integer("product_id"),
	quantity: integer("quantity").default(1),
	cartId: uuid("cart_id").references(() => carts.id),
});