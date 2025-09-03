import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { authorSchema } from "../validations/authors.schema";
import { HTTPException } from "hono/http-exception";
import { adminOnly, bearerAuth } from "../middlewares";
import { authorServices } from "../services/author.services";

const authorRouter = new Hono();

authorRouter.get("/", async (c) => {
  const authors = await authorServices.getAllAuthors();

  return c.json(authors, 200);
});

authorRouter.get("/:id", async (c) => {
  const authorId = parseInt(c.req.param("id"));

  if (!authorId) {
    return c.json({ error: "Author Id required !" }, 400);
  }

  const author = await authorServices.getAuthorByID(authorId);

  if (!author) {
    throw new HTTPException(404, { message: "Author with this id not found" });
  }

  return c.json(author, 200);
});

authorRouter.post(
  "/",
  bearerAuth,
  adminOnly,
  zValidator("json", authorSchema),
  async (c) => {
    const body = await c.req.valid("json");
    const newAuthor = await authorServices.createAuthor(body);

    return c.json(newAuthor, 200);
  }
);

export default authorRouter;
