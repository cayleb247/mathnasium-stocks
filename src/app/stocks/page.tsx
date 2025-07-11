import styles from "./stocks.module.css";
import Dashboard from "@/components/Dashboard";

export default function Stocks() {
  return (
    <div className={styles.stocksContainer}>
      <div className={styles.stocksHeading}>
        <h1>Dashboard</h1>
        <form action="">
          <input type="text" placeholder="Search for stocks" />
        </form>
      </div>
      <Dashboard></Dashboard>
    </div>
  );
}
