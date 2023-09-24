ALTER TABLE "addresses" ALTER COLUMN "city" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "save address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "recipients_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "postal_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "is_primary" boolean;--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "street";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "state";--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "zip";