import db from "@/src/db";
import { products } from "@/src/db/schema/products";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, params.id));
    return NextResponse.json({ message: "Success", product });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}
