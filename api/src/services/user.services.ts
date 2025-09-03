import { user } from "./../db/schemas/user";
import { eq } from "drizzle-orm";
import { db } from "../db/migrate";

export const userServices = {
  getAllUsers: async () => {
    return await db.query.user.findMany();
  },
  getUserByID: async (userID: number) => {
    return await db.query.user.findFirst({
      where: eq(user.id, userID),
    });
  },
};
