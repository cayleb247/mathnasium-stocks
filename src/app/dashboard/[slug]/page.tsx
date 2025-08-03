"use client";

import styles from "./stock.module.css";
import { useState, useEffect, use } from "react";
import { redirect } from "next/navigation";

export default function Stock({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = use(params); // room name

  const [session, setSession] = useState<
    false | { isAuth: boolean; userId: number } | null
  >(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/session");
      const result = await res.json();
      setSession(result);
    };

    fetchSession();
  }, []);

  // Still loading
  if (session === null) {
    return <div>Loading...</div>;
  }

  // Not authenticated — redirect
  if (session === false || !session.isAuth) {
    redirect("/");
    return null; // required after redirect
  }

  // Authenticated — show dashboard
  return (
    <div className={styles.stocksContainer}>
      <h1>{slug}</h1>
      <p>stock overviews coming later</p>
    </div>
  );
}
