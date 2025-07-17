"use client";

import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className={styles.headerContainer}>
      <Link href="/dashboard" style={{ textDecoration: "none" }}>
        <div className={styles.logoContainer}>
          <h3>Mathnasium</h3>
          <h3>|</h3>
          <h3>Stocks</h3>
        </div>
      </Link>
      {pathname == "/" ? (
        <Link href="/signup" style={{ textDecoration: "none" }}>
          <h3 className={styles.headerButton}>Sign Up</h3>
        </Link>
      ) : pathname == "/signup" ? (
        <Link href="/" style={{ textDecoration: "none" }}>
          <h3 className={styles.headerButton}>Log In</h3>
        </Link>
      ) : (
        <h3 className={styles.headerButton} onClick={logout}>Log Out</h3>
      )}
    </div>
  );
}
