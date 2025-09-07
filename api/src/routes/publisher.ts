import { zValidator } from "@hono/zod-validator";
import { adminOnly, bearerAuth } from "../middlewares";
import { publisherServices } from "../services/publisher.services";
import { Hono } from "hono";
import { publisherSchemas } from "../validations/publisher.schemas";
import { HTTPException } from "hono/http-exception";

const publisherRouter = new Hono();

publisherRouter.get("/", async (c) => {
  const data = await publisherServices.getAllPublishers();

  return c.json(data, 200);
});

publisherRouter.get("/:id", async (c) => {
  const publisherId = parseInt(c.req.param("id"));

  if (!publisherId) {
    throw new HTTPException(400, { message: "ID required" });
  }

  const foundedPublisher = await publisherServices.getPublisherByID(
    publisherId
  );

  if (!foundedPublisher) {
    throw new HTTPException(404, {
      message: "publisher with this ID not found",
    });
  }

  return c.json(foundedPublisher, 200);
});

publisherRouter.post(
  "/",
  bearerAuth,
  adminOnly,
  zValidator("json", publisherSchemas),
  async (c) => {
    const body = await c.req.valid("json");

    const newPublisher = await publisherServices.createPublisher(body);

    return c.json(newPublisher, 201);
  }
);

export default publisherRouter;
