"use client";

import { Carousel } from "@mantine/carousel";
import { Paper, rem } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const heroImages = [
  {
    id: 1,
    image: "/carousels/hero-1.png",
    alt: "hero-1",
  },
  {
    id: 2,
    image: "/carousels/hero-2.png",
    alt: "hero-1",
  },
  {
    id: 3,
    image: "/carousels/hero-1.png",
    alt: "hero-1",
  },
  {
    id: 4,
    image: "/carousels/hero-2.png",
    alt: "hero-2",
  },
  {
    id: 5,
    image: "/carousels/hero-1.png",
    alt: "hero-1",
  },
  {
    id: 6,
    image: "/carousels/hero-2.png",
    alt: "hero-2",
  },
  {
    id: 5,
    image: "/carousels/hero-1.png",
    alt: "hero-1",
  },
  {
    id: 6,
    image: "/carousels/hero-2.png",
    alt: "hero-2",
  },
];

const categoryImages = [
  {
    id: 1,
    image: "/carousels/makanan_category.png",
    alt: "category-makanan",
    link: "/categories/2"
  },
  {
    id: 2,
    image: "/carousels/fashion_category.png",
    alt: "category-fashion",
    link: "/categories/1"
  },
  {
    id: 3,
    image: "/carousels/teknologi_category.png",
    alt: "category-teknologi",
    link: "/categories/3"
  },
  {
    id: 4,
    image: "/carousels/obat_category.png",
    alt: "category-obat",
    link: "/categories/4"
  },
  {
    id: 5,
    image: "/carousels/aksesori_category.png",
    alt: "category-aksesoris",
    link: "/categories/5"
  },
]

export const CarouselCards = ({ image, alt, width, height }: { image: string; alt: string, width: number, height: number }) => {
  return (
    <Paper radius="xl" shadow="md">
      <Image src={image} alt={alt} width={456} height={180}/>
    </Paper>
  );
};

export function HeroCarousels() {
  const slides = heroImages.map((item) => (
    <Carousel.Slide key={item.id}>
      <CarouselCards {...item} width={456} height={180}/>
    </Carousel.Slide>
  ));
  return (
    <Carousel withIndicators loop slideSize="33%" slidesToScroll={1} slideGap="sm" mt={rem(20)}>
      {slides}
    </Carousel>
  );
}

export function CategoryCarousels() {
  const slides = categoryImages.map((item) => (
    <Link href={item.link} key={item.id}>
    <Carousel.Slide>
      <CarouselCards {...item} width={220} height={220}/>
    </Carousel.Slide>
    </Link>
  ))

  return (
    <Carousel slideSize="20%" loop slidesToScroll={5} slideGap="sm">
      {slides}
    </Carousel>
  )
}