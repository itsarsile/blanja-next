import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const addresses = pgTable('addresses', {
    id: serial('id').primaryKey(),
    street: text('street'),
    city: text('city'),
    state: text('state'),
    zip: text('zip'),
    user_id: serial('user_id').references(() => users.id),
});