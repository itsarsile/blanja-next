import db from "@/src/db";
import { users } from "@/src/db/schema/users";
import { supabase } from "@/src/utils/supabase";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;

    return NextResponse.json({
      id: id,
      message: "Success retrieving user data",
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:17 ~ error:", error);
    return NextResponse.json({ message: "Error while retrieveing user" });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const formData = await request.formData();
    console.log("🚀 ~ file: route.ts:27 ~ formData:", formData);
    const f = formData.get("content") as File;

    if (!f) {
      return NextResponse.json({}, { status: 400 });
    }

    // check if user has avatar already and delete it 

    const [avatar] = await db.select({avatar: users.avatar}).from(users).where(eq(users.id, params.id))
    
    
    if (avatar.avatar) {
      const urlParts = avatar?.avatar.split("/");
      const avatarPath = urlParts.slice(urlParts.indexOf("user")).join("/")

      const { data, error } = await supabase.storage.from("avatar").remove([avatarPath])
    }


    const fileExt = f.name.split(".")[1];
    const fileName = f.name.split(".")[0];

    const { data: uploadedData, error } = await supabase.storage
      .from("avatar")
      .upload(
        `user/${fileName + "-" + Date.now().toString() + "." + fileExt}`,
        f
      );

    if (uploadedData) {
      const { data: publicAvatarUrl } = await supabase.storage
        .from("avatar")
        .getPublicUrl(uploadedData.path);

      await db
        .update(users)
        .set({ avatar: publicAvatarUrl.publicUrl })
        .where(eq(users.id, params.id));

      return NextResponse.json(
        { message: "Success uploading avatar!" },
        { status: 200 }
      );
    } else {
      console.log("Error uploading", error);
      return NextResponse.json(
        { message: "Error while uploading avatar!", error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error while uploading avatar!", error: error },
      { status: 500 }
    );
  }
}
