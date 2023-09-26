import { supabase } from "@/src/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const f = formData.get("product-picture") as File;
    console.log("🚀 ~ file: route.ts:8 ~ POST ~ f:", f)

    const fileName = f.name.split(".")[0];
    const fileExt = f.name.split(".")[1];

    const { data: uploadedData, error } = await supabase.storage
      .from("products")
      .upload(
        `products/${fileName + "-" + Date.now().toString() + "." + fileExt}`,
        f
      );

    if (uploadedData) {
      const { data: publicImage } = await supabase.storage
        .from("products")
        .getPublicUrl(uploadedData.path);

      return NextResponse.json({
        message: "Success retrieving product image url",
        publicImage,
      });
    } else if (error as any) {
      console.log("🚀 ~ file: route.ts:29 ~ POST ~ error:", error.message)
      return NextResponse.json({
        message: "Error uploading product image",
        error: error.message,
      });
    }
  } catch (error: any) {
    console.log("🚀 ~ file: route.ts:36 ~ POST ~ error:", error.message)
    return NextResponse.json({
      message: "Error uploading product image",
      error,
    });
  }
}
