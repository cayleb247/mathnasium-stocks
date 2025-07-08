import Login from "@/components/Login";
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Login></Login>
    </div>
  );
}
