import db from "@/src/db";
import { users } from "@/src/db/schema/users";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const emailParam = request.nextUrl.searchParams.get("email");
    const verificationCode =
      request.nextUrl.searchParams.get("verificationCode");

    if (!emailParam || !verificationCode) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const [verifiedUser] = await db
      .update(users)
      .set({
        verified: true,
      })
      .where(
        and(
          eq(users.email, emailParam),
          eq(users.verification_code, verificationCode)
        )
      )
      .returning({ verified: users.verified });

    if (!verifiedUser) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    return NextResponse.json({ message: "Email verified successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "Error sending email" });
  }
}
