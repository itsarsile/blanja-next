import db from "@/src/db";
import { categories } from "@/src/db/schema/products";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const categoriesData = await db.select().from(categories);

    return NextResponse.json({
      message: "Success",
      categories: categoriesData,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error });
  }
}
