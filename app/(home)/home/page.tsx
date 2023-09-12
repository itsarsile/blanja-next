import React from 'react'
import { HeroCarousels } from './_components/Carousels'
import Category from './_components/Category'
import NewSection from './_components/NewSection'

export default function HomePage() {
  return (
    <>
      <HeroCarousels />
      <Category />
      <NewSection />
    </>
  )
}
