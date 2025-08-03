// /app/api/session/route.ts
import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { stocks } from "@/db/schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

export async function GET() {
  const session = await verifySession();

  if (!session || typeof session.userId !== "number") {
    throw new Error("No session")
  }

  const userStocks = await db
    .select()
    .from(stocks)
    .where(eq(stocks.usersId, session.userId));

  return NextResponse.json(userStocks);
}

export async function POST(request: Request) {
  const session = await verifySession();

  console.log(session);
  // Parse the request body
  const body = await request.json();

  if (!session) {
    throw new Error("Could not verify session");
  }

  const stockName = body.stockName;
  const stockSymbol = body.stockSym;

  if (
    !stockName ||
    !stockSymbol ||
    !session.userId ||
    typeof session.userId !== "number"
  ) {
    throw new Error("Missing required stock data");
  }

  const stock = {
    usersId: session.userId,
    name: stockName,
    realStock: stockSymbol,
  };

  console.log(session.userId);

  await db.insert(stocks).values(stock);

  return new Response(JSON.stringify(stock), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
