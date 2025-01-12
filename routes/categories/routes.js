import { Router } from "express"
import db from "../../utils/db.js"

const router = Router()

const checkCategoryExist = async (category_id) =>
  await db.categories.count({
    where: {
      category_id,
    },
  })

router.get("/", async (_, res) => {
  try {
    const categories = await db.categories.findMany()

    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/", async (req, res) => {
  const { category_name, description } = req.body

  try {
    const newCategory = await db.categories.create({
      data: {
        category_name,
        description,
      },
    })

    res.status(201).json(newCategory)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const categorie = await db.categories.findFirst({
      where: {
        category_id: Number(req.params.id),
      },
    })

    if (!categorie) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json(categorie)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.put("/:id", async (req, res) => {
  const { category_name, description } = req.body

  try {
    const isCategoryExist = await checkCategoryExist(Number(req.params.id))

    if (!isCategoryExist) {
      return res.status(404).json({ message: "Category not found" })
    }

    const updatedCategory = await db.categories.update({
      where: {
        category_id: Number(req.params.id),
      },
      data: {
        category_name,
        description,
      },
    })

    res.json(updatedCategory)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const isCategoryExist = await checkCategoryExist(Number(req.params.id))

    if (!isCategoryExist) {
      return res.status(404).json({ message: "Category not found" })
    }

    const deletedCategory = await db.categories.delete({
      where: {
        category_id: Number(req.params.id),
      },
    })

    res.json(deletedCategory)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
