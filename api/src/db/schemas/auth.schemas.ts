import z from "zod";

export const loginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(1).max(125),
});

export const registerSchema = z.object({
  email: z.email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(4).max(125),
});
