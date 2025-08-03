"use client";

import styles from "./StockProfile.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

interface StockProfileProps {
  stock?: string;
  realStock?: string;
  name?: string;
  data: StockData[];
}

function convertToCards(value: number) {
  return value * 0.05; // convert to cards (x0.5) then divide by ten (reduce value);
}

export default function StockProfile(props: StockProfileProps) {
  const [data, setData] = useState<StockData | null>(null);

  useEffect(() => {
    for (const profile of props.data) {
      console.log(profile.ticker, props.realStock);
      if (profile.ticker == props.realStock) {
        console.log('setData called!');
        setData(profile);
      }
    }
  }, [props.data, props.realStock]);

  console.log(props.data);

  return (
    <Link
      href={`/dashboard/${props.stock}`}
      style={{ textDecoration: "none" }}
      className={styles.stockProfileContainer}
    >
      <div className={styles.stockIconContainer}>
        <Image src="/stocks.svg" alt="Stocks Icon" fill></Image>
      </div>
      <div className={styles.stockDetailsContainer}>
        <h1>{props.name}</h1>
        <p>{props.realStock}</p>
        {data && (
            <div className={styles.stockPricesContainer}>
              <p>Current: {Math.round(convertToCards(data.open))} cards</p>
              <p>Low: {Math.round(convertToCards(data.low))} cards</p>
              <p>High: {Math.round(convertToCards(data.high))} cards</p>
            </div>
        )}
      </div>
    </Link>
  );
}
