import { Router } from "express"

const router = Router()

router.get("/", async (_, res) => {
  res.json({ message: "Not implemented" })
})

export default router
