import { z } from "zod"

export const CategorySchema = z.object({
  category_name: z.string().min(3),
  description: z.string().min(3),
})
