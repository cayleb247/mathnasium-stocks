CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
