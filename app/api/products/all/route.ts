import db from "@/src/db";
import { products } from "@/src/db/schema/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const product = await db.select().from(products);
    return NextResponse.json({ message: "Success", products: product });
  } catch (error) {
    return NextResponse.json({ message: "Error", error });
  }
}
