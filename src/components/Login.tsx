"use client";

import styles from "./Login.module.css";
import { login } from "@/actions/auth";
import { useActionState } from "react";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className={styles.formContainer}>
      <h1>Log In</h1>
      <form action={action}>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={
              typeof state?.username === "string" ? state.username : ""
            }
          />
          {state?.field == "Username" && (
            <p className={styles.inputErrorMessage}>{state.message}</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          {state?.field == "Password" && (
            <p className={styles.inputErrorMessage}>{state.message}</p>
          )}
        </div>

        <input type="submit" value="Login" disabled={pending} />
      </form>
    </div>
  );
}
