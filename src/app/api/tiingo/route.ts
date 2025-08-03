// app/api/tiingo/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log('body', body)
  const tickersString = body.map((ticker: string) => ticker.toLowerCase()).join(",")
  console.log('tickers string', tickersString);

  const res = await fetch(
    `https://api.tiingo.com/iex/?tickers=${tickersString}&token=bc59a8acb6c5000916720c08e433faef896b42ee`
  );
  const data = await res.json();

  console.log('data returned from api', data);

  return NextResponse.json(data);
}
