import { z } from "zod"

export const ProductSchema = z.object({
  product_name: z.string().min(3),
  description: z.string().min(3),
  price: z.number().min(0),
  stock_quantity: z.number().min(1),
  category_id: z.number(),
  supplier_id: z.number(),
})
