import { Router } from "express"
import db from "../lib/db.js"

const router = Router()

router.get("/", async (_, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Products")

    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT * FROM Products WHERE product_id = ${req.params.id}`
    )

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(results[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  const {
    product_name,
    description,
    price,
    stock_quantity,
    category_id,
    supplier_id,
  } = req.body

  try {
    const [result] = await db.query(
      `INSERT INTO Products (product_name, description, price, stock_quantity, category_id, supplier_id) VALUES ('${product_name}', '${description}', ${price}, ${stock_quantity}, ${category_id}, ${supplier_id})`
    )

    res
      .status(201)
      .json({ message: "Product added", productId: result.insertId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:id", async (req, res) => {
  const {
    product_name,
    description,
    price,
    stock_quantity,
    category_id,
    supplier_id,
  } = req.body

  try {
    const [result] = await db.query(
      `UPDATE Products SET product_name = '${product_name}', description = '${description}', price = ${price}, stock_quantity = ${stock_quantity}, category_id = ${category_id}, supplier_id = ${supplier_id} WHERE product_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product updated" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
