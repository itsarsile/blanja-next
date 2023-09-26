"use client";
import { fetcher } from "@/src/utils/fetcher";
import { Card, Grid, Group, Rating, Stack } from "@mantine/core";
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
        <Image src={image} alt={alt} width={width} height={height} className="object-cover"/>
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

export default function ProductsGrid({title, subtitle}: {title: string, subtitle: string}) {
  const { data, isLoading } = useSWR('/api/products/all', fetcher)

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(data.products)
  const products = data.products.map((product: any) => (
    <Grid.Col lg={3} key={product.id}>
      <ProductCards {...product} width={1080} height={1080}/>
    </Grid.Col>
  ));
  return (
    <section className="mt-10">
      <Stack spacing={2}>
        <p className="font-bold text-4xl text-gray-800">{title}</p>
        <p className="text-gray-500 font-thin">
          {subtitle}
        </p>
      </Stack>
      <Grid mt={5}>{products}</Grid>
    </section>
  );
}
