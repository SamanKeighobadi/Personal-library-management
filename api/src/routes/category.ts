import { Hono } from "hono";
import { bearerAuth } from "../middlewares";
import { zValidator } from "@hono/zod-validator";
import { userCategorySchema } from "../validations/categories.schema";
import { categoryServices } from "../services/category.services";
import { HTTPException } from "hono/http-exception";

const categoryRouter = new Hono();

categoryRouter.post(
  "/",
  bearerAuth,
  zValidator("json", userCategorySchema),
  async (c) => {
    const data = await c.req.valid("json");

    const newCategory = await categoryServices.createUserCategory(data);

    return c.json(newCategory, 201);
  }
);

categoryRouter.get("/", bearerAuth, async (c) => {
  const payload = c.get("jwtPayload") as { userId: number };
  const userId = payload?.userId;

  if (!userId) {
    throw new HTTPException(401, { message: "User  Not authenticated!" });
  }
  const userCategories = await categoryServices.getAllUserCategories(userId);

  return c.json(userCategories, 200);
});

categoryRouter.get("/:id", bearerAuth, async (c) => {
  const categoryID = parseInt(c.req.param("id"));
  const payload = c.get("jwtPayload") as { userId: number };
  const userId = payload?.userId;

  if (!userId) {
    throw new HTTPException(401, { message: "User  Not authenticated!" });
  }

  const category =  await categoryServices.getUserCategoryByID(categoryID,userId)
  
  if(!category){
    throw new HTTPException(400,{message:"Category not found or not authorized"})
  }

});

export default categoryRouter;
