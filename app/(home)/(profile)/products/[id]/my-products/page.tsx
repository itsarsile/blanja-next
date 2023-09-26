import React from 'react'
import { cookies } from 'next/headers'
import { DataTable } from './data-table'
import { columns } from './columns'
import ProductsTable from './ProductsTable'

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      headers: { Cookie: cookies().toString()},
      method: 'GET',
    })
  
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return error
  }
}

export default async function MyProducts() {
 const products = await getProducts()
  return (
    <div className='p-10'>
      <ProductsTable data={products.productData}/>
    </div>
  )
}
