import { db } from "./index"
import { migrate } from "drizzle-orm/neon-http/migrator"

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'src/db/migrations'
        })
        console.log("Migration successful")
    } catch (error) {
        console.error("Error with migration has occurred: ", error);
        process.exit(1);
    }
}

main();