"use client"
import { Divider } from '@mantine/core'
import ProductsGrid from '../../_components/NewSection'

export default function LikeThisSection() {
    return (
    <div>
        <Divider />
        <ProductsGrid title='You can also like this' subtitle='You&apos;ve never seen it before!'/>
    </div>
  )
}
