import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1)
      .max(120)
      .refine((value) => emailRegex.test(value), {
        message: "Email is Invalid ",
      }),
    firstName: z.string().min(1).max(255).trim(),
    lastName: z.string().min(1).max(255).trim(),
    password: z.string().min(4).max(120).trim(),
    confirmPassword: z.string().min(4).max(120),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Email does not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1)
    .max(120)
    .refine((value) => emailRegex.test(value), {
      message: "Email is Invalid ",
    }),
  password: z.string().min(4).max(120).trim(),
});
