import React from 'react'
import CheckoutProducts from './CheckoutProducts'
import { cookies } from 'next/headers';




export default async function CheckOutPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts`, {
        method: "GET",
        headers: {
          Cookie: cookies().toString(),
        },
      });

      const carts = await res.json()
  return (
    <CheckoutProducts carts={carts}/>
  )
}
