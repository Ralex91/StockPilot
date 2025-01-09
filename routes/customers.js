import { Router } from "express"
import db from "../lib/db.js"

const router = Router()

router.get("/", async (_, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Customers")

    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT * FROM Customers WHERE customer_id = ${req.params.id}`
    )

    if (results.length === 0) {
      return res.status(404).json({ message: "Customer not found" })
    }

    res.json(results[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  const { customer_name, email, phone, address } = req.body

  try {
    const [result] = await db.query(
      `INSERT INTO Customers (customer_name, email, phone, address) VALUES ('${customer_name}', '${email}', '${phone}', '${address}')`
    )

    res
      .status(201)
      .json({ message: "Customer added", customerId: result.insertId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:id", async (req, res) => {
  const { customer_name, email, phone, address } = req.body
  try {
    const [result] = await db.query(
      `UPDATE Customers SET customer_name = '${customer_name}', email = '${email}', phone = '${phone}', address = '${address}' WHERE customer_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" })
    }

    res.json({ message: "Customer updated" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      `DELETE FROM Customers WHERE customer_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" })
    }

    res.json({ message: "Customer deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
