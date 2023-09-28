import { integer, pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";
import { cart_items } from "./cart_items";
import { sql } from "drizzle-orm";

export const carts = pgTable("carts", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  user_id: integer("user_id").references(() => users.id),
  cart_items_id: uuid("cart_items_id").references(() => cart_items.id),
});
