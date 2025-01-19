import { z } from "zod"

export const SupplierSchema = z.object({
  supplier_name: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
})
