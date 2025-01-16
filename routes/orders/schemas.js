import { z } from "zod"

export const CustomerSchema = z.object({
  order_date: z.string(),
  customer_id: z.number(),
})

export const DateRangeSchema = z.object({
  start: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid start date")
    .optional(),
  end: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid end date")
    .optional(),
})
