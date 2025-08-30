import { z } from "zod";

export const authorSchema = z.object({
  faName: z.string().min(1).max(255),
  enName: z.string().min(1).max(255),
  biography: z.string().min(1),
  image: z.string().max(255).optional(),
});
