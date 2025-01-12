import { Router } from "express"
import categoriesRouter from "./categories.js"
import customersRouter from "./customers.js"
import ordersRouter from "./orders.js"
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
  {
    path: "/orders",
    router: ordersRouter,
  },
]

for (const route of routesDefinitions) {
  router.use(route.path, route.router)
}

export default router
