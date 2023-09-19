import { users } from "@/drizzle/schema";
import db from "@/src/db";
import { sendEmail } from "@/src/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams
    console.log("🚀 ~ file: route.ts:7 ~ GET ~ userId:", userId)

    // const res = await sendEmail({
    //   to: "ajiprio01@gmail.com",
    //   html: "hello",
    //   subject: "Whats'up",
    // });
    // console.log(res);
    return NextResponse.json({ message: "Send email successfully!" });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:14 ~ GET ~ error:", error)
    return NextResponse.json({ message: "Error sending email" });
  }
}
