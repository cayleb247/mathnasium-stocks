ALTER TABLE "stocks" ADD COLUMN "users_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;