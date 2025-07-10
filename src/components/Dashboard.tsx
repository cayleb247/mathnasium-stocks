'use client';

import { useEffect } from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  useEffect(() => {
    console.log("hi");
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=LMDSDA6NI3X20MK4`,
      { mode: "cors" }
    ).then((response) => {
      if (!response.ok) {
        throw new Error();
      } else {
        
        console.log(response.json());
        // return response.json();
      }
    });
  }, []);
  return (
    <div className={styles.dashboardContainer}>
      <h1>h1</h1>
    </div>
  );
}
