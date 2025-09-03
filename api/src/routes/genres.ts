import { genres } from "./../db/schemas/book";
import { Hono } from "hono";
import { db } from "../db/migrate";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { genresSchema } from "../validations/genres.schema";
import { genresServices } from "../services/genres.services";
import { HTTPException } from "hono/http-exception";
import { adminOnly, bearerAuth } from "../middlewares";

const genresRouter = new Hono();

genresRouter.get("/", async (c) => {
  
  const genres = await genresServices.getAllGenres()

  return c.json(genres, 200);
});

genresRouter.get("/:id", async (c) => {
  const genreId = parseInt(c.req.param("id"));
  
  const genre = await genresServices.getGenreByID(genreId)

  if (!genre) {
    throw new HTTPException(404,{message:"Genre not found!"})
  }

  return c.json(genre, 200);
});

genresRouter.post("/",bearerAuth,adminOnly, zValidator("json", genresSchema), async (c) => {
  const body = await c.req.valid("json");

  
  const newGenre = await genresServices.createGenre(body)

  return c.json(newGenre, 201);
});

genresRouter.delete("/:id",bearerAuth,adminOnly, async (c) => {
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
