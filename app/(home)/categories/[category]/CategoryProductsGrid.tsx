"use client";
import { fetcher } from "@/src/utils/fetcher";
import { Breadcrumbs, Card, Grid, Group, Rating, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

interface ProductCardProps {
  id: number;
  image: string;
  alt: string;
  width: number;
  height: number;
  name: string;
  price: number;
  brand: string;
  rating: number;
  totalRating: number;
}

const ProductCards = ({
  id,
  image,
  alt,
  width,
  height,
  name,
  price,
  brand,
  rating,
  totalRating,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${id}`}>
      <Card shadow="lg">
        <Card.Section>
          <Image
            src={image}
            alt={alt}
            width={width}
            height={height}
            className="object-cover"
          />
        </Card.Section>
        <Stack spacing={3} mt={10}>
          <p className="font-medium">{name.substring(0, 30)}...</p>
          <p>Rp. {price}</p>
          <p className="text-slate-400">{brand}</p>
          <Group spacing={2}>
            <Rating defaultValue={rating} readOnly />
            <p className="text-sm text-slate-400">({totalRating})</p>
          </Group>
        </Stack>
      </Card>
    </Link>
  );
};

export default function CategoryProductsGrid({
  category,
}: {
  category?: number;
}) {
  const { data, isLoading } = useSWR(`/categories/${category}/api`, fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  const products = data?.productsData.map((product: any) => (
    <Grid.Col lg={3} key={product.id}>
      <ProductCards {...product} width={1080} height={1080} />
    </Grid.Col>
  ));
  return (
    <section className="mt-10">
      <Stack spacing={20} className="mb-5">
        <Breadcrumbs>
          <Link href="/">Home</Link>
          <p>Category</p>
          <Link href={`/categories/${category}`}>
            {data?.categoryName.category}
          </Link>
        </Breadcrumbs>
        <p className="font-bold text-4xl text-gray-800">
          {data?.categoryName.category}
        </p>
      </Stack>
      <Grid mt={5}>{products}</Grid>
    </section>
  );
}
