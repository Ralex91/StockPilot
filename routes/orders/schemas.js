import { z } from "zod"

export const CustomerSchema = z.object({
  order_date: z.string(),
  customer_id: z.number(),
})
