import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { carts } from "./carts";

export const cart_items = pgTable("cart_items", {
    id: uuid("id").primaryKey(),
    product_id: integer('product_id'),
    quantity: integer('quantity').default(1),
    cartId: uuid('cart_id').references(() => carts.id)
})