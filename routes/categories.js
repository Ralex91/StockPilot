import { Router } from "express"
import db from "../lib/db.js"

const router = Router()

router.get("/", async (_, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Categories")

    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT * FROM Categories WHERE category_id = ${req.params.id}`
    )

    if (results.length === 0) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json(results[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  const { category_name, description } = req.body

  try {
    const [result] = await db.query(
      `INSERT INTO Categories (category_name, description) VALUES ('${category_name}', '${description}')`
    )

    res
      .status(201)
      .json({ message: "Category added", categoryId: result.insertId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:id", async (req, res) => {
  const { category_name, description } = req.body

  try {
    const [result] = await db.query(
      `UPDATE Categories SET category_name = '${category_name}', description = '${description}' WHERE category_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json({ message: "Category updated" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      `DELETE FROM Categories WHERE category_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json({ message: "Category deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
