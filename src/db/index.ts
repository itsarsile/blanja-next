import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const client =  postgres({
    host: "db.dqdocfvsmxugjouyvawx.supabase.co",
    database: "postgres",
    port: 6543,
    user: "postgres",
    pass: "nVYNp7fkti6nXIAJ",
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    max: 1,
})
const db = drizzle(client)


export default db