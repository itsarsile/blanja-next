import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/src/db";
import { cart_items } from "@/src/db/schema/cart_items";
import { eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { quantity, productId } = await req.json();
    console.log("🚀 ~ file: route.ts:13 ~ productId:", productId);
    quantity as number;
    productId as number;
    if (!productId) {
      return NextResponse.json({ message: "Provide a product id!" });
    }
    await db
      .insert(cart_items)
      .values({ quantity, product_id: productId, user_id: session?.user.id });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ message: "Error", status: error.message });
  }
}