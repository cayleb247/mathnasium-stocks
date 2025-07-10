import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Link href='/home' style={{ textDecoration: 'none' }}> 
        <div className={styles.logoContainer}>
          <h3>Mathnasium</h3>
          <h3>|</h3>
          <h3>Stocks</h3>
        </div>
      </Link>
    </div>
  );
}
