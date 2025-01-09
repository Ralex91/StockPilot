import { Router } from "express"
import productsRouter from "./products.js"
import suppliersRouter from "./suppliers.js"

const router = Router()

const routesDefinitions = [
  {
    path: "/products",
    router: productsRouter,
  },
  {
    path: "/suppliers",
    router: suppliersRouter,
  },
]

for (const route of routesDefinitions) {
  router.use(route.path, route.router)
}

export default router
