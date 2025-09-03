import { eq } from "drizzle-orm";
import { db } from "../db/migrate";
import { IUser } from "../types/user.types";
import { user } from "../db/schemas";

interface CreateUserBody
  extends Pick<IUser, "email" | "firstName" | "lastName"|"role"> {
  password: string;
}

interface FindUserByIDResponse  extends IUser {
    password: string;
}

export const authServices = {
  findUserByEmail: async (email: string): Promise<FindUserByIDResponse | null> => {
    const result = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  },

  createUser: async (data: CreateUserBody) => {
    const [newUser] = await db
      .insert(user)
      .values(data)
      .returning({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role:user.role
      });
    return newUser;
  },
};
