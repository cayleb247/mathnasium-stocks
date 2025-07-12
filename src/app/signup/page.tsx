import SignUp from "@/components/Signup";
import styles from "./signup.module.css"
import Image from "next/image";

export default function Signup() {
  return (
    <div className={styles.Container}>
      <SignUp></SignUp>
      <div className={styles.imageContainer}>
        <Image src="/mathnasium-front.jpg" fill={true} alt="Picture of Mathnasium"></Image>
      </div>
    </div>
  );
}
