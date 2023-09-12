"use client";
import { Stack } from "@mantine/core";
import React from "react";
import { CategoryCarousels } from "./Carousels";

export default function Category() {
  return (
    <section className="mt-10">
      <Stack spacing="xs">
        <p className="font-bold text-4xl text-gray-800">Category</p>
        <p className="text-gray-500 font-thin">
          What are you currently looking for?
        </p>
        <CategoryCarousels />
      </Stack>
    </section>
  );
}
