import { Router } from "express"
import db from "../../utils/db.js"

const router = Router()

const checkProductExist = async (product_id) =>
  await db.products.count({ where: { product_id } })

router.get("/", async (_, res) => {
  try {
    const products = await db.products.findMany()

    res.json(products)
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

    const {
      product_name,
      description,
      price,
      stock_quantity,
      category_id,
      supplier_id,
    } = data

    const newProduct = await db.products.create({
      data: {
        product_name,
        description,
        price,
        stock_quantity,
        category_id,
        supplier_id,
      },
    })

    res.status(201).json(newProduct)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const product = await db.products.findFirst({
      where: { product_id: Number(req.params.id) },
    })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id/orders", async (req, res) => {
  try {
    const orders = await db.orders.findMany({
      where: {
        order_lines: {
          some: {
            product_id: Number(req.params.id),
          },
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

router.put("/:id", async (req, res) => {
  try {
    const isProductExist = await checkProductExist(Number(req.params.id))

    if (!isProductExist) {
      return res.status(404).json({ message: "Product not found" })
    }

    const { data, error } = CustomerSchema.safeParse(req.body)

    if (error) {
      return res.status(400).json({ error: error.flatten().fieldErrors })
    }

    const {
      product_name,
      description,
      price,
      stock_quantity,
      category_id,
      supplier_id,
    } = data

    const updatedProduct = await db.products.update({
      where: {
        product_id: Number(req.params.id),
      },
      data: {
        product_name,
        description,
        price,
        stock_quantity,
        category_id,
        supplier_id,
      },
    })

    res.json(updatedProduct)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const isProductExist = await checkProductExist(Number(req.params.id))

    if (!isProductExist) {
      return res.status(404).json({ message: "Product not found" })
    }

    const deletedProduct = await db.products.delete({
      where: {
        product_id: Number(req.params.id),
      },
    })

    res.json(deletedProduct)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
