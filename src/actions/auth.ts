"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import * as argon2 from "argon2";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "@/db/schema";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = await SignupFormSchema.safeParseAsync({
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPw"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      username: formData.get("username"),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...

  const { username, password } = validatedFields.data;

  const hashedPassword = await argon2.hash(password);
  console.log(`Hashed Password is ${hashedPassword}`);

  const user: typeof users.$inferInsert = {
    username: username,
    password: hashedPassword,
  };

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await db.insert(users).values(user);
  console.log("New user created!");

  await createSession(user.id!);
  // 5. Redirect user
  redirect("/");
}

export async function login(state: FormState, formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  console.log("data received");

  if (password == null || username == null) {
    return;
  }

  const [user] = await db
    .select({ password: users.password, id: users.id })
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    return {
      username: username,
      field: "Username",
      message: "User does not exist.",
    };
  }

  if (await argon2.verify(user.password, password)) {
    await createSession(user.id!);
    redirect("/dashboard");
  } else {
    return {
      username: username,
      field: "Password",
      message: "Incorrect Password",
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
