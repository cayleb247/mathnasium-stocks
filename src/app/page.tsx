import Login from "@/components/Login";
import styles from "./page.module.css"
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Login></Login>
      <div className={styles.imageContainer}>
        <Image src="/mathnasium-front.jpg" fill={true} alt="Picture of Mathnasium"></Image>
      </div>
    </div>
  );
}
