import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => new PrismaClient()

const db = globalThis.db ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== "production") {
  globalThis.db = db
}
