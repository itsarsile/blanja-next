import { HeroCarousels } from "./_components/Carousels";
import Category from "./_components/Category";
import ProductsGrid from "./_components/NewSection";
import NewSection from "./_components/NewSection";

export default async function HomePage() {
  return (
    <>
      <HeroCarousels />
      <Category />
      <ProductsGrid title="New" subtitle="You&apos;ve never seen it before" />
    </>
  );
}
