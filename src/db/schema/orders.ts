import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const orders = pgTable("orders ", {
    id: serial("id").primaryKey(),
    product_id: integer('product_id'),
    quantity: integer('quantity').default(1),
})