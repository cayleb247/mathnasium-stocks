"use client";

import { useEffect, useState } from "react";
import styles from "./StockList.module.css";
import StockProfile from "./StockProfile";
// import StockProfile from "./StockProfile";

interface StockData {
  ticker: string;
  timestamp: string;
  lastSaleTimestamp?: null | string;
  quoteTimestamp?: null | string;
  open: number;
  high: number;
  low: number;
  mid?: number;
  tngoLast?: number;
  last?: number;
  lastSize?: number;
  bidSize?: number;
  bidPrice?: number;
  askPrice?: number;
  askSize?: number;
  volume?: number;
  prevClose?: number;
}
type Stock = {
  id: number;
  name: string;
  usersId: number;
  realStock: string;
  data: StockData;
};

export default function StockList(props: {refreshKey: number}) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockTickers, setStockTickers] = useState<string[]>([]);
  const [stockData, setStockData] = useState<StockData[]>([]);

  useEffect(() => {
    console.log("use effect stock tickers", stockTickers);

    fetch("/api/tiingo", {
      method: "POST",
      body: JSON.stringify(stockTickers),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data from api", data);
        setStockData(data);
      })
      .catch((err) => {
        console.error("API fetch failed", err);
      });
  }, [stockTickers]);

  useEffect(() => {
    const fetchStocks = async () => {
      const res = await fetch("/api/stock");
      const result = await res.json();
      console.log("results from get request", result);
      setStocks(result);
    };

    fetchStocks();
  }, [props.refreshKey]);

  useEffect(() => {
    const tickers: string[] = [];
    const getStockTickers = () => {
      for (const stock of stocks) {
        console.log('real stock', stock.realStock);
        tickers.push(stock.realStock);
      }

      setStockTickers(tickers);
    };

    getStockTickers();

    console.log("tickers:", tickers);
  }, [stocks]);

  return (
    <div className={styles.dashboardContainer}>
      {stocks.map((stock) => (
        <StockProfile
          key={stock.id}
          name={stock.name}
          realStock={stock.realStock}
          data={stockData}
        />
      ))}
    </div>
  );
}
