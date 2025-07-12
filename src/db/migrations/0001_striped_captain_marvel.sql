CREATE TABLE "stocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"real_stock" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
