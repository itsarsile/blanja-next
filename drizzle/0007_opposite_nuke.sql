ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_carts_id_fk";
--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "cart_items_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_cart_items_id_cart_items_id_fk" FOREIGN KEY ("cart_items_id") REFERENCES "cart_items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "cart_id";