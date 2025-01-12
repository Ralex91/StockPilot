import { Router } from "express"
import db from "../lib/db.js"

const router = Router()

router.get("/", async (_, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Orders")

    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT * FROM Orders WHERE order_id = ${req.params.id}`
    )

    if (results.length === 0) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(results[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  const { order_date, customer_id } = req.body
  try {
    const [result] = await db.query(
      `INSERT INTO Orders (order_date, customer_id) VALUES (${order_date}, ${customer_id})`
    )

    res.status(201).json({ message: "Order added", orderId: result.insertId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:id", async (req, res) => {
  const { order_date, customer_id } = req.body

  try {
    const [result] = await db.query(
      `UPDATE Orders SET order_date = '${order_date}', customer_id = ${customer_id} WHERE order_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json({ message: "Order updated" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      `DELETE FROM Orders WHERE order_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json({ message: "Order deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
