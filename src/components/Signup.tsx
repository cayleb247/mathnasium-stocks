"use client";

import styles from "./Signup.module.css";
import { signup } from "@/actions/auth";
import { useActionState } from "react";

export default function SignUp() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className={styles.formContainer}>
      <h1>Sign Up</h1>
      <form action={action}>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" defaultValue={typeof state?.username === "string" ? state.username : ""} />
          {state?.errors?.username && <p className={styles.inputErrorMessage}>{state.errors.username}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          {state?.errors?.password && (
            <div className={styles.passwordErrorContainer}>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="confirmPw">Confirm Password</label>
          <input type="password" id="confirmPw" name="confirmPw" />
          {state?.errors?.confirmPassword && (
            <p className={styles.inputErrorMessage}>{state.errors.confirmPassword}</p>
          )}
        </div>
        <input type="submit" value="Sign Up" disabled={pending} />
      </form>
    </div>
  );
}
