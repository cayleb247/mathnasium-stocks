import { z } from "zod";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

async function userExists(username : string) {
    const result = await db.select().from(users).where(eq(users.username, username))
    if (result.length > 0) {
        return true;
    } else if (result.length == 0) {
        return false;
    }
}

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character",
      })
      .trim(),
    confirmPassword: z
      .string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine( async (data) => {
    return !(await userExists(data.username))
  }, {
    message: "Username has been taken",
    path: ["username"],
  })

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload =
    {
        userId: number;
        expiresAt: Date;
    }