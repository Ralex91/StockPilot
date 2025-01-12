import { Router } from "express"
import db from "../../utils/db.js"

const router = Router()

router.get("/", async (_, res) => {
  try {
    const [results] = await db.query("SELECT * FROM Suppliers")

    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT * FROM Suppliers WHERE supplier_id = ${req.params.id}`
    )

    if (results.length === 0) {
      return res.status(404).json({ message: "Supplier not found" })
    }

    res.json(results[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  const { supplier_name, contact, phone, address } = req.body
  try {
    const [result] = await db.query(
      `INSERT INTO Suppliers (supplier_name, contact, phone, address) VALUES ('${supplier_name}', '${contact}', '${phone}', '${address}')`
    )

    res
      .status(201)
      .json({ message: "Supplier added", supplierId: result.insertId })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/:id", async (req, res) => {
  const { supplier_name, contact, phone, address } = req.body

  try {
    const [result] = await db.query(
      `UPDATE Suppliers SET supplier_name = '${supplier_name}', contact = '${contact}', phone = '${phone}', address = '${address}' WHERE supplier_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Supplier not found" })
    }

    res.json({ message: "Supplier updated" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      `DELETE FROM Suppliers WHERE supplier_id = ${req.params.id}`
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Supplier not found" })
    }

    res.json({ message: "Supplier deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
