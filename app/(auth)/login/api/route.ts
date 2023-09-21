import { users } from "@/drizzle/schema";
import db from "@/src/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { omit } from "lodash";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    if (!password) {
      return NextResponse.json(
        { message: "Password is required!" },
        { status: 400 }
      );
    }

    if (!user.password || (await bcrypt.compare(user.password, password))) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }
    const userWithoutPassword = omit(user, ["password"]);
    return NextResponse.json(
      {
        message: "Login successful!",
        userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while logging in!" },
      { status: 500 }
    );
    console.error(error);
  }
}
