import { HeroCarousels } from "./_components/Carousels";
import Category from "./_components/Category";
import NewSection from "./_components/NewSection";

export default async function HomePage() {
  return (
    <>
      <HeroCarousels />
      <Category />
      <NewSection />
    </>
  );
}
