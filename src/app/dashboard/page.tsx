"use client";

import styles from "./dashboard.module.css";
import StockList from "@/components/StockList";
import CreateStockDialog from "@/components/CreateStockDialog";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const [session, setSession] = useState<
    false | { isAuth: boolean; userId: number } | null
  >(null);
  const [dialogOpen, toggleDialog] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const triggerRefresh = () => {
    setRefreshCount((prev) => prev + 1);
    console.log("new refresh count!", refreshCount);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const result = await res.json();
      setSession(result);
    };

    fetchSession();
  }, []);

  // Still loading
  if (session === null) {
    return <div>Loading...</div>;
  }

  // Not authenticated — redirect
  if (session === false || !session.isAuth) {
    redirect("/");
    return null; // required after redirect
  }

  // Authenticated — show dashboard
  return (
    <div className={styles.stocksContainer}>
      <div className={styles.stocksHeading}>
        <h1>Dashboard</h1>
        <form action="">
          <input type="text" placeholder="Search for stocks" />
        </form>
        <div
          className={styles.newStockButton}
          onClick={() => toggleDialog(true)}
        >
          + Add Stock
        </div>
      </div>
      <StockList refreshKey={refreshCount}/>
      <CreateStockDialog
        isOpen={dialogOpen}
        onClose={() => toggleDialog(false)}
        onCreate={() => triggerRefresh()}
      ></CreateStockDialog>
    </div>
  );
}
