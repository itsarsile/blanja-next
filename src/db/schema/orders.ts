import { pgEnum, pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { carts } from "./carts";
import { addresses } from "./addresses";

export const orderStatusEnum = pgEnum("order_status", ['pending', 'shipping', 'shipped', 'completed'])

export const orders = pgTable('orders', {
    id: uuid('id').primaryKey(),
    cart_id: uuid('cart_id').references(() => carts.id),
    status: orderStatusEnum('order_status'),
    address: serial('id').references(() => addresses.id)
})