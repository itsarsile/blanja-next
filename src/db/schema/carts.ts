import { integer, pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

export const carts = pgTable('carts', {
    id: uuid('id').primaryKey(),
    user_id: integer('user_id').references(() => users
    .id),
    product_id: integer('product_id').references(() => products
   .id),
})