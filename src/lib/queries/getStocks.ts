import { db } from "@/db"
import { stocks } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getStock(id: number) {
    const stock = await db.select()
        .from(stocks)
        .where(eq(stocks.id, id))

    return stock[0];
}