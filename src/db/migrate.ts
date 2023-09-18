import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import "dotenv-flow/config";

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(migrationClient)

async function main() {
    try {
        console.timeLog('Running migrations...')
        await migrate(db, { migrationsFolder: "drizzle" });
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(0)
    }
}

main()