import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db/migrate";
import { eq } from "drizzle-orm";
import { authors } from "../db/schemas";
import { authorSchema } from "../validations/authors.schema";

const authorRouter = new Hono();

authorRouter.get("/", async (c) => {
  const authors = await db.query.authors.findMany();

  return c.json(authors, 200);
});

authorRouter.get("/:id", async (c) => {
  const authorId = parseInt(c.req.param("id"));

  if (!authorId) {
    return c.json({ error: "Author Id required !" }, 400);
  }

  const author = await db.query.authors.findFirst({
    where: eq(authors.id, authorId),
  });

  if (!author) {
    return c.json({ error: "Author with this id not found" }, 404);
  }

  return c.json(author, 200);
});

authorRouter.post("/", zValidator("json", authorSchema), async (c) => {
  const body = await c.req.valid("json");

  const newAuthor = await db.insert(authors).values(body).returning();

  return c.json(newAuthor, 200);
});



export default authorRouter;
