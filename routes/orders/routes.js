import { Router } from "express"
import db from "../../utils/db.js"
import {
  DateRangeSchema,
  FilterSchema,
  OrderLineSchema,
  OrderSchema,
} from "./schemas.js"

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

router.get("/filter", async (req, res) => {
  const { data, error } = FilterSchema.safeParse(req.query)

  if (error) {
    return res.status(400).json({ error: error.flatten().fieldErrors })
  }

  const { customer_id, start_date, end_date, product_id } = data

  try {
    const orders = await db.orders.findMany({
      where: {
        AND: [
          customer_id ? { customer_id } : undefined,
          start_date && end_date
            ? {
                order_date: {
                  gte: new Date(start_date),
                  lte: new Date(end_date),
                },
              }
            : undefined,
          product_id
            ? {
                order_lines: {
                  some: {
                    product_id,
                  },
                },
              }
            : undefined,
        ].filter(Boolean),
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
    const { data, error } = OrderSchema.safeParse(req.body)

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

    const { data, error } = OrderSchema.safeParse(req.body)

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

router.post("/:id/lines", async (req, res) => {
  try {
    const order = await db.orders.findFirst({
      where: {
        order_id: Number(req.params.id),
      },
    })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    const { data, error } = OrderLineSchema.safeParse(req.body)

    if (error) {
      return res.status(400).json({ error: error.flatten().fieldErrors })
    }

    const { product_id, quantity } = data

    const product = await db.products.findFirst({
      where: {
        product_id,
      },
    })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    if (product.stock_quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" })
    }

    const newOrderLine = await db.order_Lines.create({
      data: {
        order_id: order.order_id,
        product_id,
        unit_price: product.price,
        quantity,
      },
    })

    await db.products.update({
      where: {
        product_id,
      },
      data: {
        stock_quantity: product.stock_quantity - quantity,
      },
    })

    res.status(201).json(newOrderLine)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/:id/lines/:lineId", async (req, res) => {
  try {
    const orderLine = await db.order_lines.findFirst({
      where: {
        order_id: order.order_id,
        order_line_id: Number(req.params.lineId),
      },
    })

    if (!orderLine) {
      return res.status(404).json({ message: "Order line not found" })
    }

    const deletedOrderLine = await db.order_lines.delete({
      where: {
        order_line_id: orderLine.order_line_id,
      },
    })

    res.json(deletedOrderLine)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
