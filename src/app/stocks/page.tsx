import styles from "./stocks.module.css";
import Dashboard from "@/components/Dashboard";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Stocks() {
  const session = await verifySession();

  if (session) {
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
  } else {
    redirect("/")
  }
}
