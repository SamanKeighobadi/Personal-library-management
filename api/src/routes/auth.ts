import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { Hono } from "hono";

import { loginSchema, registerSchema } from "../db/schemas/auth.schemas";

import { hash, compare } from "bcrypt";
import { generateToken } from "../utils/jwt.utils";
import { TokenPayload } from "../types/auth.types";
import { authServices } from "../services/auth.services";

const authRouter = new Hono();

authRouter.post("/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = await c.req.valid("json");

  const foundUser = await authServices.findUserByEmail(email);

  if (!foundUser) {
    throw new HTTPException(401, { message: "user with this email not exist" });
  }

  const isValidatePassword = await compare(password, foundUser.password);

  if (!isValidatePassword) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }

  const payload = {
    user: {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    },
  } as TokenPayload;

  const token = generateToken(payload, { expiresIn: "1d" });

  return c.json(token, 200);
});

authRouter.post("/register", zValidator("json", registerSchema), async (c) => {
  const { email, firstName, lastName, password } = await c.req.valid("json");

  const existingUser = await authServices.findUserByEmail(email);

  if (existingUser) {
    throw new HTTPException(400, {
      message: "User with this email Already exist",
    });
  }

  const hashPassword = await hash(password, 10);

  const newUser = await authServices.createUser({
    email,
    firstName,
    lastName,
    password: hashPassword,
    role: "user",
  });

  const payload = {
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    },
  } as TokenPayload;

  const token = generateToken(payload, { expiresIn: "1d" });

  return c.json(
    {
      payload,
      token,
    },
    201
  );
});

export default authRouter;
