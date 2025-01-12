import { categoriesDocs } from "../routes/categories/docs.js"
import { customersDoc } from "../routes/customers/docs.js"
import { productsDoc } from "../routes/products/docs.js"
import { suppliersDoc } from "../routes/suppliers/docs.js"

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "StockPilot API",
    version: "1.0.0",
    description: "API documentation for the stock management system.",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Local server",
    },
  ],
  paths: {
    ...customersDoc,
    ...suppliersDoc,
    ...productsDoc,
    ...categoriesDocs,
  },
}

export default swaggerDoc
