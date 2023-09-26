"use client";

import { fetcher } from "@/src/utils/fetcher";
import {
  ActionIcon,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Group,
  Progress,
  Rating,
  Stack,
} from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";
import { Products } from "../../(profile)/products/[id]/my-products/columns";
import { Minus, Plus, Star } from "lucide-react";
import Link from "next/link";
import { StarFilledIcon } from "@radix-ui/react-icons";

export default function ProductDetails({ productsId }: { productsId: number }) {
  const [quantity, setQuantity] = useState<number>(0);
  const { data, isLoading } = useSWR(`/api/products/${productsId}`, fetcher);

  if (isLoading) {
    return "Loading...";
  }

  const product: Products = data.product;

  const items = [
    { title: "Home", href: "/" },
    { title: `${product.name.substring(0, 30)} ...`, href: "#" },
  ].map((item) => (
    <Link href={item.href} key={item.title}>
      {item.title}
    </Link>
  ));

  return (
    <div className="py-10">
      <Breadcrumbs
        styles={{ separator: { color: "GrayText" } }}
        className="pb-5 text-slate-400"
        separator=">"
      >
        {items}
      </Breadcrumbs>
      <Grid gutter={20}>
        <Grid.Col lg={4}>
          <Image
            src={product.image}
            style={{ width: "auto", height: "auto" }}
            width={378}
            height={378}
            alt={product.name}
            className="object-contain aspect-square shadow-xl rounded-md"
          />
        </Grid.Col>
        <Grid.Col lg={8}>
          <div className="flex flex-col max-w-lg gap-5">
            <Stack spacing={4}>
              <h1 className="text-xl font-bold">{product.name}</h1>
              <p className="text-base text-slate-400">{product.brand}</p>
              <Group spacing={1}>
                <Rating defaultValue={product.rating} readOnly />
                <span className="text-slate-400">
                  ({product.rating ? product.rating : "0"})
                </span>
              </Group>
              <span className="text-slate-400 text-xs">Price</span>
              <h1 className="text-xl font-bold">
                Rp {product.price.toLocaleString("id-ID")}
              </h1>
            </Stack>
            <Group>
              <div className="flex flex-col gap-2">
                Quantity
                <Group>
                  <ActionIcon
                    color="red.6"
                    variant="outline"
                    radius="xl"
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </ActionIcon>
                  <span>{quantity}</span>
                  <ActionIcon
                    variant="outline"
                    radius="xl"
                    color="red.6"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </ActionIcon>
                </Group>
              </div>
            </Group>
            <Grid gutter={10} grow>
              <Grid.Col span={3}>
                <Button
                  color="gray.6"
                  variant="outline"
                  styles={{
                    root: {
                      width: "100%",
                    },
                  }}
                  radius="xl"
                >
                  Chat
                </Button>
              </Grid.Col>
              <Grid.Col span={3}>
                <Button
                  color="gray.6"
                  variant="outline"
                  styles={{
                    root: {
                      width: "100%",
                    },
                  }}
                  radius="xl"
                >
                  Add bag
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button
                  color="red.6"
                  className="bg-red-600"
                  styles={{
                    root: {
                      width: "100%",
                    },
                  }}
                  radius="xl"
                >
                  Buy now
                </Button>
              </Grid.Col>
            </Grid>
          </div>
        </Grid.Col>
      </Grid>
      <div className="flex flex-col gap-8 pt-10">
        <Stack spacing={5}>
          <h1 className="text-2xl font-bold">Informasi Produk</h1>
          <Divider />
        </Stack>
        <Stack spacing={2}>
          <p className="text-xl font-bold">Condition</p>
          <p className="text-red-600 font-bold">{product.conditions}</p>
        </Stack>
        <Stack spacing={2}>
          <h1 className="text-xl font-bold">Description</h1>
          <p className="text-slate-600 text-justify">{product.description}</p>
        </Stack>
        <Stack>
          <h1 className="text-2xl font-bold">Product review</h1>
          <div className="flex gap-5">
            <Stack align="center">
              <div className="flex items-end">
                <h1 className="text-6xl font-bold">0.0</h1>
                <h1 className="text-lg text-slate-600">/10</h1>
              </div>
              <Rating defaultValue={product.rating} size="lg" />
            </Stack>
            <Stack spacing={0.5}>
              <div className="flex items-center gap-4">
                <StarFilledIcon className="text-orange-400 w-4 h-4" />
                <span className="text-slate-600">5</span>
                <Progress value={0} color="red" className="w-32" />
                <span className="text-slate-600">0</span>
              </div>
              <div className="flex items-center gap-4">
                <StarFilledIcon className="text-orange-400 w-4 h-4" />
                <span className="text-slate-600">4</span>
                <Progress value={0} color="red" className="w-32" />
                <span className="text-slate-600">0</span>
              </div>

              <div className="flex items-center gap-4">
                <StarFilledIcon className="text-orange-400 w-4 h-4" />
                <span className="text-slate-600">3</span>
                <Progress value={0} color="red" className="w-32" />
                <span className="text-slate-600">0</span>
              </div>

              <div className="flex items-center gap-4">
                <StarFilledIcon className="text-orange-400 w-4 h-4" />
                <span className="text-slate-600">2</span>
                <Progress value={0} color="red" className="w-32" />
                <span className="text-slate-600">0</span>
              </div>
              <div className="flex items-center gap-4">
                <StarFilledIcon className="text-orange-400 w-4 h-4" />
                <span className="text-slate-600">1</span>
                <Progress value={0} color="red" className="w-32" />
                <span className="text-slate-600">0</span>
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
}
