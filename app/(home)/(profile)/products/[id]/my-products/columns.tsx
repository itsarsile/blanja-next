"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetcher } from "@/src/utils/fetcher";
import {
  Button,
  Divider,
  FileInput,
  Group,
  Image,
  NumberInput,
  Radio,
  ScrollArea,
  Select,
  Stack,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import useSWR, { mutate } from "swr";

export type Products = {
  id: number;
  name: string;
  brand: string;
  category_id: number;
  category: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
  conditions: string;
  created_at: string;
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
    accessorKey: "category",
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
    cell: ({ row }) => <Image src={row.original.image} width={100} />,
  },
  {
    accessorKey: "conditions",
    header: "Conditions",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.created_at)
        .toLocaleString()
        .split(",")[0];
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      const handleDelete = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
            {
              method: "DELETE",
              body: JSON.stringify({productId: product.id}),
            }
          );
          if (res.ok) {
            mutate('/api/products')
            notifications.show({
              message: `Product ${product.name.substring(
                0,
                10
              )}... successfully deleted`,
            });
          }
        } catch (error) {
          notifications.show({
            message: "Error deleting product"
          })
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                modals.open({
                  title: `${row.original.name.substring(0, 20)}...`,
                  children: <EditProductModals {...product} />,
                });
              }}
            >
              Edit Products
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function EditProductModals(productData: Products) {
  const { data, isLoading } = useSWR("/api/products/categories", fetcher);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    initialValues: {
      name: productData.name,
      brand: productData.brand,
      category: productData.category,
      price: productData.price,
      stock: productData.stock,
      image: productData.image,
      description: productData.description,
      conditions: productData.conditions,
    },
  });

  let categories = [];

  if (isLoading) {
    categories = [""];
    return categories;
  }

  categories = data?.categories.map((category: any) => category.name);

  const onSubmit = form.onSubmit(async (values, _event) => {
    _event.preventDefault();
    try {
      const formData = new FormData();
      const dataObj: Record<string, any> = {
        name: values.name,
        brand: values.brand,
        category: values.category,
        stock: values.stock,
        image: values.image,
        description: values.description,
        conditions: values.conditions,
        productId: productData.id.toString(),
      };

      for (const key in dataObj) {
        formData.append(key, dataObj[key]);
      }

      if (file) {
        console.log("🚀 ~ file: columns.tsx:187 ~ onSubmit ~ file:", file);
        formData.append("product-image", file);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        notifications.show({
          message: "Product updated successfully",
        });
        mutate(`/api/products`);
        modals.closeAll();
      }
    } catch (error) {
      notifications.show({
        message: "Product updated failed",
      });
      modals.closeAll();
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Stack>
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Inventory</p>
            <Divider />
            <TextInput label="Name of goods" {...form.getInputProps("name")} />
            <TextInput label="Brand" {...form.getInputProps("brand")} />
            <Select
              label="Category"
              data={categories}
              {...form.getInputProps("category")}
            />
          </Stack>
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Item details</p>
            <Divider />
            <Stack>
              <NumberInput
                label="Unit price"
                precision={2}
                decimalSeparator=","
                thousandsSeparator="."
                {...form.getInputProps("price")}
              />
              <NumberInput
                label="Stock"
                rightSection={<span className="pr-6 text-slate-400">Buah</span>}
                {...form.getInputProps("stock")}
              />
              <Radio.Group
                {...form.getInputProps("conditions")}
                label="Conditions"
              >
                <Group>
                  <Radio label="New" value="New" />
                  <Radio label="Second" value="Second" />
                </Group>
              </Radio.Group>
            </Stack>
          </Stack>
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Photo of goods</p>
            <Divider />
            {file && (
              <Image
                maw={rem(300)}
                src={file ? URL.createObjectURL(file) : null}
                withPlaceholder
              />
            )}
            <FileInput
              accept="image/*"
              placeholder="Pick a photo"
              onChange={setFile}
            />
          </Stack>
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Description</p>
            <Divider />
            <Textarea
              minRows={4}
              maxRows={8}
              placeholder="Description"
              {...form.getInputProps("description")}
            />
          </Stack>
          <Button
            color="red.6"
            className="bg-red-600 justify-end"
            variant="filled"
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}
