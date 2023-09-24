import {
  foreignKey,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp
} from "drizzle-orm/pg-core";
import { store_profile } from "./users";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  brand: text("brand").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull(),
  conditions: text("conditions").notNull(),
  rating: real("rating"),
  category_id: integer("category_id").references(() => categories.id),
  store_id: integer("store_id").references(() => store_profile.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    rating: real("rating").notNull(),
    message: text("message").notNull(),
    product_id: integer("product_id"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      productsRefrence: foreignKey({
        columns: [table.product_id],
        foreignColumns: [products.id],
      }),
    };
  }
);
