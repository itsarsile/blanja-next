"use client";

import { Image, ScrollArea } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";

export type Products = {
  id: number;
  name: string;
  brand: string;
  category_id: number;
  description: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
  conditions: string;
  createdAt: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "id",
    header: "Product ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category_id",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <ScrollArea h={100}>{row.getValue("description")}</ScrollArea>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => <Image src={row.original.image} width={180} />,
  },
  {
    accessorKey: "conditions",
    header: "Conditions",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.createdAt)
        .toLocaleString()
        .split(",")[0];
      return <div>{formattedDate}</div>;
    },
  },
];
