import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const client =  postgres({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 6543,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    max: 1,
})
const db = drizzle(client)


export default db