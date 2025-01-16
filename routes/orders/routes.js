import { Router } from "express"
import db from "../../utils/db.js"
import { CustomerSchema, DateRangeSchema } from "./schemas.js"

const router = Router()

const checkOrderExist = async (category_id) =>
  await db.orders.count({
    where: {
      category_id,
    },
  })

router.get("/", async (req, res) => {
  try {
    const rawStart = req.query.start
    const rawEnd = req.query.end

    const { data, error } = DateRangeSchema.safeParse({
      start: rawStart,
      end: rawEnd,
    })

    if (error) {
      return res.status(400).json({ error: error.flatten().fieldErrors })
    }

    const orders = await db.orders.findMany({
      where: {
        order_date: {
          ...(data.start && { gte: new Date(data.start) }),
          ...(data.end && { lte: new Date(data.end) }),
        },
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

router.post("/", async (req, res) => {
  try {
    const { data, error } = CustomerSchema.safeParse(req.body)

    if (error) {
      return res.status(400).json({ error: error.flatten().fieldErrors })
    }

    const { order_date, customer_id } = data

    const newOrder = await db.orders.create({
      data: {
        order_date: new Date(order_date),
        customer_id,
      },
    })

    res.status(201).json(newOrder)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const order = await db.orders.findFirst({
      where: {
        order_id: Number(req.params.id),
      },
    })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const isOrderExist = await checkOrderExist(Number(req.params.id))

    if (!isOrderExist) {
      return res.status(404).json({ message: "Order not found" })
    }

    const { data, error } = CustomerSchema.safeParse(req.body)

    if (error) {
      return res.status(400).json({ error: error.flatten().fieldErrors })
    }

    const { order_date, customer_id } = data

    const updatedOrder = await db.orders.update({
      where: {
        order_id: Number(req.params.id),
      },
      data: {
        order_date: new Date(order_date),
        customer_id,
      },
    })

    res.json(updatedOrder)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const isOrderExist = await checkOrderExist(Number(req.params.id))

    if (!isOrderExist) {
      return res.status(404).json({ message: "Order not found" })
    }

    const deletedOrder = await db.orders.delete({
      where: {
        order_id: Number(req.params.id),
      },
    })

    res.json(deletedOrder)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
