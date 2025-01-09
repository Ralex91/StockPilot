import { Router } from "express"
import productsRouter from "./products.js"

const router = Router()

const routesDefinitions = [
  {
    path: "/products",
    router: productsRouter,
  },
]

for (const route of routesDefinitions) {
  router.use(route.path, route.router)
}

export default router
