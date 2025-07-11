import styles from "./StockProfile.module.css";
import Image from "next/image";
import Link from "next/link";

export default function StockProfile({ stock_id }: { stock_id: string }) {
  return (
    <Link href={`/stocks/${stock_id}`} style={{textDecoration: "none"}}>
      <div className={styles.stockProfileContainer}>
        <div className={styles.stockIconContainer}>
          <Image
            src="/stock-icons/ferris-wheel.svg"
            alt="Coryland's icon"
            fill
          ></Image>
        </div>
        <div className={styles.stockDetailsContainer}>
          <h1>Coryland</h1>
          <p>Walt Disney Co (DIS)</p>
          <h3>6 Cards</h3>
        </div>
      </div>
    </Link>
  );
}
