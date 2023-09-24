import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const addresses = pgTable('addresses', {
    id: serial('id').primaryKey(),
    save_address: text('save address').notNull(),
    recipients_name: text('recipients_name').notNull(),
    recipients_phone: text('recipients_phone').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    postal_code: text('postal_code').notNull(),
    is_primary: boolean('is_primary'),
    user_id: serial('user_id').references(() => users.id),
});