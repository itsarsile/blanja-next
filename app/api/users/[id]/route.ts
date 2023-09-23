import db from "@/src/db";
import { users } from "@/src/db/schema/users";
import { eq } from "drizzle-orm";
import { omit } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    const userWithoutPassword = omit(user, ["password"]);
    return NextResponse.json({
      message: "Success retrieving user data",
      userWithoutPassword,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error while retrieveing user" });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const { name, email, phoneNumber, gender, dateOfBirth } =
      await request.json();
    const updatedUser = await db
      .update(users)
      .set({
        name,
        email,
        phone_number: phoneNumber,
        gender,
       date_of_birth: dateOfBirth 
      })
      .where(eq(users.id, id));

      return NextResponse.json({message: "Success updating user", data: updatedUser});
  } catch (error) {
    console.log("🚀 ~ file: route.ts:45 ~ error:", error)
    return NextResponse.json(
      { message: "Error while updating user" },
      { status: 500 }
    );
  }
}
