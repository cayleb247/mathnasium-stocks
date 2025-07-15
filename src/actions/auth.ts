'use server';

import { SignupFormSchema, FormState } from "@/lib/definitions";
import * as argon2 from "argon2";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "@/db/schema";
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

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

  await createSession(user.id!)
  // 5. Redirect user
  redirect('/')
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}