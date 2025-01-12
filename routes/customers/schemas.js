export const CustomerSchema = z.object({
  customer_name: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
})
