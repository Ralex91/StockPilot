import { Router } from "express"
import categoriesRouter from "./categories.js"
import customersRouter from "./customers.js"
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
  {
    path: "/categories",
    router: categoriesRouter,
  },
  {
    path: "/customers",
    router: customersRouter,
  },
]

for (const route of routesDefinitions) {
  router.use(route.path, route.router)
}

export default router
