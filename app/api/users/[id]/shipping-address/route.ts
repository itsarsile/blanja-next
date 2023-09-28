import db from "@/src/db";
import { addresses } from "@/src/db/schema/addresses";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const {
      saveAddress,
      recipientsName,
      recipientsPhone,
      address,
      city,
      postalCode,
      isPrimary,
    } = await request.json();

    await db.insert(addresses).values({
      save_address: saveAddress,
      recipients_name: recipientsName,
      recipients_phone: recipientsPhone,
      address: address,
      city: city,
      postal_code: postalCode,
      is_primary: isPrimary,
      user_id: params.id,
    });

    return NextResponse.json(
      { message: "Success creating address" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while creating address" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const {
      saveAddress,
      recipientsName,
      recipientsPhone,
      address,
      city,
      postalCode,
      isPrimary,
      addressId,
    } = await request.json();

    await db
      .update(addresses)
      .set({
        save_address: saveAddress,
        recipients_name: recipientsName,
        recipients_phone: recipientsPhone,
        address: address,
        city: city,
        postal_code: postalCode,
        is_primary: isPrimary,
      })
      .where(eq(addresses.id, addressId));

    return NextResponse.json(
      { message: "Success updating address" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while creating address" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    let userAddress;
    const userAddressQuery = db.select().from(addresses);

    userAddress = await userAddressQuery.where(eq(addresses.user_id, params.id));

    return NextResponse.json(userAddress, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while getting address" },
      { status: 500 }
    );
  }
}
