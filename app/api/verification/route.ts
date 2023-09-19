import { users } from "@/drizzle/schema";
import db from "@/src/db";
import crypto from "crypto";
import { sendEmail } from "@/src/utils/nodemailer";
import { and, eq, sql } from "drizzle-orm";
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
          eq(users.verificationCode, verificationCode)
        )
      ).returning({ verified: users.verified });
    console.log("🚀 ~ file: route.ts:34 ~ GET ~ userVerificationCode:", verifiedUser)

    if (!verifiedUser) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    return NextResponse.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:14 ~ GET ~ error:", error);
    return NextResponse.json({ message: "Error sending email" });
  }
}
