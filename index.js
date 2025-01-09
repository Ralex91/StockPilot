import cors from "cors"
import express from "express"
import routes from "./routes/index.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_, res) => {
  res.send("StockPilot REST API")
})

app.use(routes)
app.use((_, res) => {
  res.status(404).json({ error: "Not found" })
})

app.listen(3333, () =>
  console.log("Server running on port 3333 : http://localhost:3333")
)
