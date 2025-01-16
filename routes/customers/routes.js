import { Router } from "express"
import db from "../../utils/db.js"
import { CategorySchema } from "../categories/schemas.js"

const router = Router()

const checkCustomerExist = async (customer_id) =>
  await db.customers.count({
    where: {
      customer_id,
    },
  })

router.get("/", async (_, res) => {
  try {
    const customers = await db.customers.findMany()

    res.json(customers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { data, error } = CategorySchema.safeParse(req.body)

    if (error) {
      return res.status(400).json({ error: error.flatten().fieldErrors })
    }

    const { customer_name, email, phone, address } = data

    const customer = await db.customers.create({
      data: {
        customer_name,
        email,
        phone,
        address,
      },
    })

    res.status(201).json(customer)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const customer = await db.customers.findFirst({
      where: {
        customer_id: Number(req.params.id),
      },
    })

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" })
    }

    res.json(customer)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id/orders", async (req, res) => {
  try {
    const orders = await db.orders.findMany({
      where: {
        customer_id: Number(req.params.id),
      },
      include: {
        order_lines: true,
      },
    })

    res.json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const isCustomerExist = await checkCustomerExist(Number(req.params.id))

    if (!isCustomerExist) {
      return res.status(404).json({ message: "Customer not found" })
    }

    const { data, error } = CategorySchema.safeParse(req.body)

    if (error) {
      return res.status(400).json({ error: error.flatten().fieldErrors })
    }

    const { customer_name, email, phone, address } = data

    const updatedCustomer = await db.customers.update({
      where: {
        customer_id: Number(req.params.id),
      },
      data: {
        customer_name,
        email,
        phone,
        address,
      },
    })

    res.json(updatedCustomer)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const isCustomerExist = await checkCustomerExist(Number(req.params.id))

    if (!isCustomerExist) {
      return res.status(404).json({ message: "Customer not found" })
    }

    const deletedCustomer = await db.customers.delete({
      where: {
        customer_id: Number(req.params.id),
      },
    })

    res.json(deletedCustomer)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
