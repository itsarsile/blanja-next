"use client";
import { Card, Grid, Group, Rating, Stack } from "@mantine/core";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  id: number;
  image: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  price: number;
  brand: string;
  rating: number;
  totalRating: number;
}

const ProductCards = ({
  image,
  alt,
  width,
  height,
  title,
  price,
  brand,
  rating,
  totalRating,
}: ProductCardProps) => {
  return (
    <Card shadow="lg">
      <Card.Section>
        <Image src={image} alt={alt} width={width} height={height} />
      </Card.Section>
      <Stack spacing={3} mt={10}>
        <p className="font-medium">{title}</p>
        <p>Rp. {price}</p>
        <p className="text-slate-400">{brand}</p>
        <Group spacing={2}>
          <Rating defaultValue={rating} readOnly />
          <p className="text-sm text-slate-400">({totalRating})</p>
        </Group>
      </Stack>
    </Card>
  );
};

export default function NewSection() {

  const products = productData.map((product) => (
    <Grid.Col lg={3} key={product.id}>
      <ProductCards {...product} />
    </Grid.Col>
  ));
  return (
    <section className="mt-10">
      <Stack spacing={2}>
        <p className="font-bold text-4xl text-gray-800">New</p>
        <p className="text-gray-500 font-thin">
          You&apos;ve never seen it before!
        </p>
      </Stack>
      <Grid mt={5}>{products}</Grid>
    </section>
  );
}

const productData: ProductCardProps[] = [
  {
    id: 1,
    title: "Men's Formal Black Suit",
    image: "/product-placeholder.png",
    alt: "product-placeholder",
    brand: "Zalora Cloth",
    width: 400,
    height: 136,
    price: 50000,
    rating: 4,
    totalRating: 20,
  },
  {
    id: 2,
    title: "Men's Formal Black Suit",
    image: "/product-placeholder.png",
    alt: "product-placeholder",
    brand: "Zalora Cloth",
    width: 400,
    height: 136,
    price: 50000,
    rating: 4,
    totalRating: 20,
  },
  {
    id: 3,
    title: "Men's Formal Black Suit",
    image: "/product-placeholder.png",
    alt: "product-placeholder",
    brand: "Zalora Cloth",
    width: 400,
    height: 136,
    price: 50000,
    rating: 4,
    totalRating: 20,
  },
  {
    id: 4,
    title: "Men's Formal Black Suit",
    image: "/product-placeholder.png",
    alt: "product-placeholder",
    brand: "Zalora Cloth",
    width: 400,
    height: 136,
    price: 50000,
    rating: 4,
    totalRating: 20,
  },
  {
    id: 5,
    title: "Men's Formal Black Suit",
    image: "/product-placeholder.png",
    alt: "product-placeholder",
    brand: "Zalora Cloth",
    width: 400,
    height: 136,
    price: 50000,
    rating: 4,
    totalRating: 20,
  },
  {
    id: 6,
    title: "Men's Formal Black Suit",
    image: "/product-placeholder.png",
    alt: "product-placeholder",
    brand: "Zalora Cloth",
    width: 400,
    height: 136,
    price: 50000,
    rating: 4,
    totalRating: 20,
  },
];
