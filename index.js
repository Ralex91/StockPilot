import cors from "cors"
import express from "express"
import swaggerUi from "swagger-ui-express"
import routes from "./routes/index.js"
import swaggerDocument from "./utils/swagger.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_, res) => {
  res.send("Welcome to StockPilot API, documentation is available at /docs")
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(routes)
app.use((_, res) => {
  res.status(404).json({ error: "Not found" })
})

app.listen(3333, () => {
  console.log("Server running on port 3333 : http://localhost:3333")
})
