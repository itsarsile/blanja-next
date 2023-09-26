import db, { client } from "@/src/db";
import { categories, products } from "@/src/db/schema/products";
import { store_profile } from "@/src/db/schema/users";
import { supabase } from "@/src/utils/supabase";
import { eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { request } from "http";
import { deleteExistingImage } from "@/src/utils/deleteExistingImage";
import { fileUploader } from "@/src/utils/file-upload";

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

    const productData = await db.execute(sql`
      SELECT products.*, categories.name as "category"
      FROM 
        products
        JOIN categories ON products.category_id = categories.id
      WHERE 
        products.store_id = store_id;
    `);

    return NextResponse.json(
      { message: "Success retrieving products", productData },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:84 ~ GET ~ error:", error);
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

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const formData = Object.fromEntries(Array.from(data.entries()));
    console.log("🚀 ~ file: route.ts:112 ~ PUT ~ formData:", formData);

    if (formData.category) {
      const category = formData.category as string;

      const [categoryId] = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.name, category));

      await db
        .update(products)
        .set({ category_id: categoryId.id })
        .where(eq(products.id, Number(formData.productId)));
    }

    if (formData["product-image"]) {
      const file = formData["product-image"] as File;
      // check existing product image
      const [image] = await db
        .select({ url: products.image })
        .from(products)
        .where(eq(products.id, Number(formData.productId)));
      await deleteExistingImage(image.url, "products", "product");
      const publicUrl = await fileUploader(file, "products", "product");

      await db
        .update(products)
        .set({ image: publicUrl })
        .where(eq(products.id, Number(formData.productId)));
    }

    await db
      .update(products)
      .set({
        name: formData.name as string,
        brand: formData.brand as string,
        stock: formData.stock as unknown as number,
        price: formData.price as unknown as number,
        description: formData.description as string,
        conditions: formData.conditions as string,
      })
      .where(eq(products.id, Number(formData.productId)));

    return NextResponse.json({ message: "Updated success" });
  } catch (error) {
    return NextResponse.json({ messagee: "Error updating products", error });
  }
}

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json();
    console.log("🚀 ~ file: route.ts:165 ~ DELETE ~ productId:", productId)
    const id = Number(productId);
    await db.delete(products).where(eq(products.id, id));
    return NextResponse.json(
      { message: "Success deleting products" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json({message: "Error deleting products"});
  }
}
