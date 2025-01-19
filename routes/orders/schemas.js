import { z } from "zod"

export const OrderSchema = z.object({
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

export const OrderLineSchema = z.object({
  product_id: z.number(),
  quantity: z.number().min(1),
})

export const FilterSchema = z.object({
  customer_id: z
    .string()
    .optional()
    .transform((id) => (id ? Number(id) : null)),
  start_date: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), "Invalid start date"),
  end_date: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), "Invalid end date"),
  product_id: z
    .string()
    .optional()
    .transform((id) => (id ? Number(id) : null)),
})
