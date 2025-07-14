'use client'

import styles from "./Signup.module.css";
import { signup } from "@/actions/auth";
import { useActionState } from "react";

export default function SignUp() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className={styles.formContainer}>
      <h1>Sign Up</h1>
      <form action={action}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        {state?.errors?.username && <p>{state.errors.username}</p>}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <label htmlFor="confirmPw">Confirm Password</label>
        <input type="password" id="confirmPw" name="confirmPw" />
        {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}
        <input type="submit" value="Sign Up" disabled={pending} />
      </form>
    </div>
  );
}
