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

export default router
