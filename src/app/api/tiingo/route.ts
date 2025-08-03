// app/api/tiingo/route.ts
import { NextResponse } from "next/server";

const API_KEYS = ["21b3968a8992398510554c085af7f87af7623f1b", "bc59a8acb6c5000916720c08e433faef896b42ee", "8f9f9469af19d72fea545703bd7fc1fdbf495da0", "e85bf4e01d9eaa3267fdd3ed375d747d7e1fd0f9"]

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  const tickersString = body
    .map((ticker: string) => ticker.toLowerCase())
    .join(",");
  console.log("tickers string", tickersString);

  async function requestData(API_KEY: string) {
    const res = await fetch(
      `https://api.tiingo.com/iex/?tickers=${tickersString}&token=${API_KEY}`
    );
    const data = await res.json();

    console.log("data returned from api", data);

    if (!data.detail) {
      return NextResponse.json(data);
    } else {
        throw new Error("Tiingo api key overuse")
    }
  }

  for (const key of API_KEYS) {
    try {
        const data = await requestData(key);
        return data;
    } catch {
        continue;
    }
  }

  throw new Error("All api keys overused");

}
