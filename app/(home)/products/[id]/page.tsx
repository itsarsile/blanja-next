import React from "react";
import ProductDetails from "./ProductDetails";
import LikeThisSection from "./LikeThisSection";

export default function DetailProductPage({
  params,
}: {
  params: { id: number };
}) {
  return (
      <div>
        <ProductDetails productsId={params.id}/>
        <LikeThisSection />
      </div>
  )
}
