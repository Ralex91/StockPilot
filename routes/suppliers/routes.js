import { Router } from "express"
import db from "../../utils/db.js"

const router = Router()

const checkSupplierExist = async (supplier_id) =>
  await db.suppliers.count({ where: { supplier_id } })

router.get("/", async (_, res) => {
  try {
    const suppliers = await db.suppliers.findMany()

    res.json(suppliers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/", async (req, res) => {
  const { supplier_name, contact, phone, address } = req.body
  try {
    const newSupplier = await db.suppliers.create({
      data: {
        supplier_name,
        contact,
        phone,
        address,
      },
    })

    res.status(201).json(newSupplier)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const supplier = await db.suppliers.findFirst({
      where: {
        supplier_id: Number(req.params.id),
      },
    })

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" })
    }

    res.json(supplier)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.put("/:id", async (req, res) => {
  const { supplier_name, contact, phone, address } = req.body

  try {
    const isSupplierExist = await checkSupplierExist(Number(req.params.id))

    if (!isSupplierExist) {
      return res.status(404).json({ message: "Supplier not found" })
    }

    const updatedSupplier = await db.suppliers.update({
      where: {
        supplier_id: Number(req.params.id),
      },
      data: {
        supplier_name,
        contact,
        phone,
        address,
      },
    })

    res.json(updatedSupplier)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const isSupplierExist = await checkSupplierExist(Number(req.params.id))

    if (!isSupplierExist) {
      return res.status(404).json({ message: "Supplier not found" })
    }

    const deletedSupplier = await db.suppliers.delete({
      where: {
        supplier_id: Number(req.params.id),
      },
    })

    res.json(deletedSupplier)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
