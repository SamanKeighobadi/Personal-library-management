import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { bookSchema } from "../validations/book.schema";
import { bookServices } from "../services/book.services";

const bookRouter = new Hono();

bookRouter.get("/", async (c) => {
  const books = await bookServices.getAllBooks();

  return c.json(books, 200);
});

bookRouter.get("/:id", async (c) => {
  const bookId = parseInt(c.req.param("id"));
  const bookDetail = await bookServices.getBookByID(bookId);

  if (!bookDetail) {
    return c.json({ error: "Book with this ID not found" }, 404);
  }

  return c.json(bookDetail, 200);
});

bookRouter.post("/", zValidator("json", bookSchema), async (c) => {
  const body = await c.req.valid("json");
  const newBook = await bookServices.createBook(body);

  return c.json(newBook, 201);
});

export default bookRouter;
