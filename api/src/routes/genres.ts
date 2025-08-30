import { genres } from "./../db/schemas/book";
import { Hono } from "hono";
import { db } from "../db/migrate";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { genresSchema } from "../validations/genres.schema";

const genresRouter = new Hono();

genresRouter.get("/", async (c) => {
  const genres = await db.query.genres.findMany();

  c.json(genres, 200);
});

genresRouter.get("/:id", async (c) => {
  const genreId = parseInt(c.req.param("id"));
  const genre = await db.query.genres.findFirst({
    where: eq(genres.id, genreId),
  });

  if (!genre) {
    return c.json({ error: "Genre not found" }, 404);
  }

  return c.json(genre, 200);
});

genresRouter.post("/", zValidator("json", genresSchema), async (c) => {
  const body = await c.req.valid("json");

  const newGenre = await db.insert(genres).values(body).returning();

  return c.json(newGenre, 201);
});

genresRouter.delete("/:id", async (c) => {
  const genreId = parseInt(c.req.param("id"));

  if (!genreId) {
    return c.json("Genre with this ID not found !", 404);
  }

  const deleted = await db
    .delete(genres)
    .where(eq(genres.id, genreId))
    .returning();

  return c.json(deleted, 200);
});

export default genresRouter;
