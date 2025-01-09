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

export default router
