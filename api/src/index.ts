import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import { db } from "./db/migrate";
import genresRouter from "./routes/genres";
import authorRouter from "./routes/authors";

const app = new Hono();

app.use(logger());
app.use("/api/*", cors());

app.route("/api/genres", genresRouter);
app.route("/api/authors",authorRouter)

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/genres", async (c) => {
  const genres = await db.query.genres.findMany();

  return c.json(genres, 200);
});

export default app;
