import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "../db/migrate";
import { book } from "../db/schemas";
import { bookSchema } from "../validations/book.schema";

import { eq } from "drizzle-orm";

const bookRouter = new Hono();

bookRouter.get("/", async (c) => {
  const books = await db.query.book.findMany();

  return c.json(books, 200);
});

bookRouter.get("/:id", async (c) => {
  const bookId = parseInt(c.req.param("id"));
  const bookDetail = await db.query.book.findFirst({
    where: eq(book.id, bookId),
  });

  if (!bookDetail) {
    return c.json({ error: "Book with this ID not found" }, 404);
  }

  return c.json(bookDetail, 200);
});

bookRouter.post("/", zValidator("json", bookSchema), async (c) => {
  const body = await c.req.valid("json");
  const newBook = await db.insert(book).values(body).returning();

  return c.json(newBook, 201);
});

export default bookRouter;
