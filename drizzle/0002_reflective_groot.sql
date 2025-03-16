CREATE TABLE "subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"plan" text NOT NULL,
	"reference_id" text NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"status" text,
	"period_start" timestamp,
	"period_end" timestamp,
	"cancel_at_period_end" boolean,
	"seats" integer
);
--> statement-breakpoint
CREATE TABLE "steps_project" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"project_id" varchar(36),
	"name" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(255) NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "projects" 
ALTER COLUMN "end_date" 
SET DATA TYPE timestamp with time zone 
USING "end_date"::timestamp with time zone;

ALTER TABLE "client" ALTER COLUMN "website" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "stripe_session_payment" ADD COLUMN "project_id" varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE "stripe_session_payment" ADD COLUMN "amount" numeric(10, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "user_id" varchar(36);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "type" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "vat_number" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "contact_name" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "contact_email" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "contact_phone" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "contact_position" varchar(255);--> statement-breakpoint
ALTER TABLE "steps_project" ADD CONSTRAINT "steps_project_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stripe_session_payment" ADD CONSTRAINT "stripe_session_payment_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client" ADD CONSTRAINT "client_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;