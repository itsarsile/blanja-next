import db from "@/src/db";
import { categories, products } from "@/src/db/schema/products";
import { store_profile } from "@/src/db/schema/users";
import { supabase } from "@/src/utils/supabase";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    // Get products data from the form
    const {
      name,
      brand,
      category,
      price,
      stock,
      description,
      conditions,
      image,
      userId,
    } = await request.json();

    // Get the category id first
    const [categoryId] = await db
      .select({ categoryId: categories.id })
      .from(categories)
      .where(eq(categories.name, category));

    // Get store profile id
    const [profileId] = await db
      .select({ profileId: store_profile.id })
      .from(store_profile)
      .where(eq(store_profile.user_id, +userId));

    // Insert the products

    await db.insert(products).values({
      name,
      conditions,
      brand,
      description,
      image,
      price,
      stock,
      store_id: profileId.profileId,
      category_id: categoryId.categoryId,
    });

    return NextResponse.json(
      { message: "Success adding products" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:80 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Error adding products" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    const [store_id] = await db
      .select({ id: store_profile.id })
      .from(store_profile)
      .where(eq(store_profile.user_id, userId));

    const productData = await db
      .select()
      .from(products)
      .where(eq(products.store_id, store_id.id));

    return NextResponse.json(
      { message: "Success retrieving products", productData },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:84 ~ GET ~ error:", error)
    return NextResponse.json(
      {
        message: "Error while retrieving product data",
      },
      {
        status: 500,
      }
    );
  }
}
