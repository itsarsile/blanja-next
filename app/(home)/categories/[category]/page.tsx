import React from 'react'
import CategoryProductsGrid from './CategoryProductsGrid'

export default function CategoryPage({params} : { params: { category: number }}) {
  return (
    <div>
        <CategoryProductsGrid category={params.category}/>
    </div>
  )
}
