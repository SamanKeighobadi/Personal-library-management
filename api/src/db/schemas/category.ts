import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { book } from "./book";

export const category = pgTable("categories", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  userId: serial("user_id")
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const bookCategory = pgTable("book_categories", {
  bookId: serial("book_id")
    .references(() => book.id)
    .notNull(),
  categoryId: serial("category_id")
    .references(() => category.id)
    .notNull(),
});
