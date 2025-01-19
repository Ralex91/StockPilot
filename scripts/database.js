import "dotenv/config"
import mysql from "mysql2/promise"
import fs from "node:fs"

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,
  multipleStatements: true,
})

const init = async () => {
  if (process.argv && process.argv.length !== 3) {
    console.log("Usage: node database.js <create, drop>")
    process.exit(1)
  }

  if (process.argv[2] === "create") {
    await createDb()

    return
  }

  if (process.argv[2] === "drop") {
    await dropDb()

    return
  }

  console.log("Invalid argument " + process.argv[2] + ". Use create or drop?")
  process.exit(0)
}

const createDb = async () => {
  try {
    const sql = fs.readFileSync("database.sql", "utf8")

    await connection.query(sql)
    console.log("Database created")
  } catch (error) {
    console.error(error)
  } finally {
    connection.end()
  }
}

const dropDb = async () => {
  try {
    const sql = `DROP DATABASE IF EXISTS ${process.env.DB_DATABASE}`

    await connection.query(sql)
    console.log("Database dropped")
  } catch (error) {
    console.error(error)
  } finally {
    connection.end()
  }
}

init()
