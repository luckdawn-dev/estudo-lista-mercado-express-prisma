import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  id: z.string().optional(),
});

export const categoryUpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
});
