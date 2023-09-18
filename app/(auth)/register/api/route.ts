import crypto from "crypto";
import db from "@/src/db";
import {hash} from "bcryptjs"
import { users } from "@/src/db/schema/users";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (role === "seller") {
      const { storeName, phoneNumber, name } = await request.json();
    }

    const verifyCode = crypto.randomBytes(32).toString("hex");
    const verificationCode = crypto
      .createHash("sha256")
      .update(verifyCode)
      .digest("hex");


    const hashedPassword = await hash(password, 10)

    const registerUser = await db.insert(users).values({
      email,
      password: hashedPassword,
      role,
      verification_code: verificationCode,
    }).returning({email: users.email, verification_code: users.verification_code});

    if (!registerUser) {
      return NextResponse.json(
        { message: "Error when registering user." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully", registerUser },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:43 ~ POST ~ error:", error)
    return NextResponse.json(
      { message: "Error when registering user." },
      { status: 500 }
    );
  }
}
