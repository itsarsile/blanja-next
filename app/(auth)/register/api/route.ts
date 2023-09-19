import crypto from "crypto";
import db from "@/src/db";
import { hash } from "bcryptjs";
import { store_profile, users } from "@/src/db/schema/users";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { email, password, role } = requestBody;

    const verifyCode = crypto.randomBytes(32).toString("hex");
    const verificationCode = crypto
      .createHash("sha256")
      .update(verifyCode)
      .digest("hex");

    const hashedPassword = await hash(password, 10);

    console.log("🚀 ~ file: route.ts:10 ~ POST ~ role:", role);

    if (role === "seller") {
      const { storeName, phoneNumber, name } = requestBody;

      const registerSeller = await db
        .insert(users)
        .values({
          email,
          name,
          password: hashedPassword,
          verification_code: verificationCode,
          role,
        })
        .returning({ userId: users.id });

      await db.insert(store_profile).values({
        store_name: storeName,
        store_phone: phoneNumber,
        user_id: registerSeller[0].userId,
      });

      if (!registerSeller) {
        return NextResponse.json(
          { message: "Error when registering user." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }

    const registerUser = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        role,
        verification_code: verificationCode,
      })
      .returning({
        email: users.email,
        verification_code: users.verification_code,
      });

    if (!registerUser) {
      return NextResponse.json(
        { message: "Error when registering user." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:76 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Error when registering user." },
      { status: 500 }
    );
  }
}
