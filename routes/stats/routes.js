import { Router } from "express"
import db from "../../utils/db.js"
import { DateRangeSchema } from "../orders/schemas.js"

const router = Router()

router.get("/low-stock", async (req, res) => {
  const seuil = req.query.seuil

  try {
    const products = await db.products.findMany({
      where: {
        stock_quantity: {
          lte: Number(seuil, 10),
        },
      },
    })

    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/best-selling", async (req, res) => {
  const rawStart = req.query.start
  const rawEnd = req.query.end

  const { data, error } = DateRangeSchema.safeParse({
    start: rawStart,
    end: rawEnd,
  })

  if (error) {
    return res.status(400).json({ error: error.flatten().fieldErrors })
  }

  try {
    const topProducts = await db.order_Lines.groupBy({
      by: ["product_id"],
      _sum: {
        quantity: true,
      },
      where: {
        orders: {
          order_date: {
            ...(data.start && { gte: new Date(data.start) }),
            ...(data.end && { lte: new Date(data.end) }),
          },
        },
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 10,
    })

    const formattedProducts = topProducts.map((item) => ({
      product_id: item.product_id,
      quantity: item._sum.quantity,
    }))

    res.json(formattedProducts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
