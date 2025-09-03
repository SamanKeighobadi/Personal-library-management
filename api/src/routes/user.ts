import { Hono } from "hono";
import { adminOnly, bearerAuth } from "../middlewares";
import { userServices } from "../services/user.services";
import { HTTPException } from "hono/http-exception";

const userRouter = new Hono();

userRouter.get("/", bearerAuth, adminOnly, async (c) => {
  const users = await userServices.getAllUsers();

  return c.json(users, 200);
});

userRouter.get("/:id", bearerAuth, adminOnly, async (c) => {
  const userID = parseInt(c.req.param("id"));
  const user = await userServices.getUserByID(userID);

  if (!user) {
    throw new HTTPException(404, {
      message: "User with provided ID not found",
    });
  }

  return c.json(user, 200);
});

export default userRouter;
