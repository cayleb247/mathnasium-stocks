import styles from "./dashboard.module.css";
import StockList from "@/components/StockList";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Dashboard() {
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
        <StockList></StockList>
      </div>
    );
  } else {
    redirect("/")
  }
}
