import db from "@/src/db";
import { categories, products } from "@/src/db/schema/products";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { category: number } }
) {
  try {
    const [categoryName] = await db
      .select({ category: categories.name })
      .from(categories)
      .where(eq(categories.id, params.category));
    const productsData = await db.execute(sql`
      select 
      products.id as id,
        products.name as name,
        products.price as price,
        products.brand as brand,
        products.rating as rating,
        products.image as image
      from products
      join categories on products.category_id = categories.id
      where products.category_id = ${params.category}
    `);

    return NextResponse.json({
      categoryName,
      productsData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" });
  }
}
