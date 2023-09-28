import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import db from "@/src/db";
import { cart_items } from "@/src/db/schema/cart_items";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { products } from "@/src/db/schema/products";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { cartItemsId } = await req.json();

    await db.delete(cart_items).where(eq(cart_items.id, cartItemsId));

    return NextResponse.json({ message: "Success" }, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error", status: error.message });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const cartsData = await db.execute(sql`
              select 
                products.name as name,
                products.brand as brand,
                products.price as price,
                products.image as image,
                cart_items.quantity as quantity,
                (products.price * cart_items.quantity) as total_price
              from ${cart_items} 
              inner join ${products} 
              on ${cart_items.product_id} = ${products.id} 
              where ${cart_items.user_id} = ${session?.user.id} 
          `);

    return NextResponse.json(
      { message: "Success", cartsData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error" });
  }
}
