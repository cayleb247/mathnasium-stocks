import styles from "./stocks.module.css"
import Dashboard from "@/components/Dashboard";

export default function Stocks() {
  return (
    <div className={styles.stocksContainer}>
        <h1>Dashboard</h1>
        <Dashboard></Dashboard>
    </div>
  );
}
