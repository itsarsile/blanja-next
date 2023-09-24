import React from 'react'
import SellProductSections from './SellProductSections'
import db from '@/src/db'
import { categories } from '@/src/db/schema/products'

async function getCategories() {
    const categoryData = await db.select().from(categories)
    return categoryData
}


export default async function SellProducts() {
    const categories = await getCategories()
  return (
    <div className='p-10'>
        <SellProductSections categories={categories} />
    </div>
  )
}
