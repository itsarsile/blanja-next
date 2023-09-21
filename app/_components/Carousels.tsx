"use client";

import { Carousel } from "@mantine/carousel";
import { Paper, rem } from "@mantine/core";
import Image from "next/image";
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
    image: "/carousels/category-1.png",
    alt: "category-1",
  },
  {
    id: 2,
    image: "/carousels/category-2.png",
    alt: "category-2",
  },
  {
    id: 3,
    image: "/carousels/category-3.png",
    alt: "category-3",
  },
  {
    id: 4,
    image: "/carousels/category-4.png",
    alt: "category-4",
  },
  {
    id: 5,
    image: "/carousels/category-5.png",
    alt: "category-5",
  },
  {
    id: 6,
    image: "/carousels/category-2.png",
    alt: "category-2",
  },
  {
    id: 7,
    image: "/carousels/category-3.png",
    alt: "category-3",
  },
  {
    id: 8,
    image: "/carousels/category-4.png",
    alt: "category-4",
  },
  {
    id: 9,
    image: "/carousels/category-5.png",
    alt: "category-5",
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
    <Carousel.Slide key={item.id}>
      <CarouselCards {...item} width={206} height={220}/>
    </Carousel.Slide>
  ))

  return (
    <Carousel slideSize="20%" loop slideGap="sm">
      {slides}
    </Carousel>
  )
}