import { supabase } from "@/src/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const f = formData.get("product-picture") as File;

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
    } else if (error) {
    }
  } catch (error) {}
}
