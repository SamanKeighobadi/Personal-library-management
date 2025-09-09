import {
  pgTable,
  timestamp,
  varchar,
  serial,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const statusType = pgEnum("status", ["read", "reading", "unread"]);

export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  faName: varchar("fa_name", { length: 255 }).notNull(),
  enName: varchar("en_name", { length: 255 }).notNull(),
  biography: text("biography").notNull(),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const book = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  authorId: serial("author_id")
    .references(() => authors.id)
    .notNull(),
  genreId: serial("genre_id")
    .references(() => genres.id)
    .notNull(),
  publisherId: serial("publisher_id")
    .references(() => publisher.id)
    .notNull(),
  status: statusType("status").notNull(),
  description: text("description").notNull(),
  image: varchar("image").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const note = pgTable("note", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .references(() => user.id)
    .notNull(),
  bookId: serial("book_id")
    .references(() => book.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const publisher = pgTable("publisher", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const bookRelations = relations(book, ({ one }) => ({
  author: one(authors, {
    fields: [book.authorId],
    references: [authors.id],
  }),
  genre: one(genres, {
    fields: [book.genreId],
    references: [genres.id],
  }),
  publisher: one(publisher, {
    fields: [book.publisherId],
    references: [publisher.id],
  }),
}));
