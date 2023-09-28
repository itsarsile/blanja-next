import React from "react";
import MyBagCards from "./MyBagCards";
import { cookies } from "next/headers";

export default async function MyBag() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts`, {
    method: "GET",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const carts = await res.json();
  return <MyBagCards carts={carts} />;
}
