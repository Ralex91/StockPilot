import { Router } from "express"
import categoriesRouter from "./categories/routes.js"
import customersRouter from "./customers/routes.js"
import ordersRouter from "./orders/routes.js"
import productsRouter from "./products/routes.js"
import statsRouter from "./stats/routes.js"
import suppliersRouter from "./suppliers/routes.js"

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
  {
    path: "/stats",
    router: statsRouter,
  },
]

for (const route of routesDefinitions) {
  router.use(route.path, route.router)
}

export default router
