import db from "@/src/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      brand,
      description,
      price,
      stock,
      conditions,
      category,
      storeId,
    } = await request.json();

    const categoryId = await db.select().from
  } catch (error) {}
}
