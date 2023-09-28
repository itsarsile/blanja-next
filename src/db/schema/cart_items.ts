import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { carts } from "./carts";
import { products } from "./products";
import { users } from "./users";

export const cart_items = pgTable("cart_items", {
    id: uuid("id").primaryKey().defaultRandom(),
    product_id: integer('product_id').references(() => products.id),
    user_id: integer('user_id').references(() => users.id),
    quantity: integer('quantity').default(1),
})