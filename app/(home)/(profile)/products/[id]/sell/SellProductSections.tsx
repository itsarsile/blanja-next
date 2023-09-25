"use client";
import {
  Button,
  Divider,
  FileInput,
  Group,
  Image,
  NumberInput,
  Paper,
  Radio,
  Select,
  Stack,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { mutate } from "swr";

export default function SellProductSections({
  categories,
}: {
  categories: any[];
}) {
  const [file, setFile] = useState<File | null>(null);

  const { data } = useSession();
  // Display category data
  const category = categories.map((category) => {
    return category.name;
  });

  const form = useForm({
    initialValues: {
      name: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      conditions: "",
      userId: data?.user.id,
    },
  });


  const onSubmit = form.onSubmit(async (values, _event) => {
    _event.preventDefault();

    try {
      if (!file) {
        notifications.show({
          message: "Please select product file",
        });

        return;
      }

      const formData = new FormData();
      formData.append("content", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            userId: form.values.userId,
          }),
        }
      );

      const photo = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          method: "POST",
          body: formData,
        }
      );

      if (res.ok && photo.ok) {
        mutate("/api/products");
        notifications.show({
          message: "Success added new product!",
        });
      }
    } catch (error) {
      notifications.show({
        message: "Error while adding new product",
      });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Inventory</p>
            <Divider />
            <Group className="pt-5">
              <TextInput
                label="Name of goods"
                {...form.getInputProps("name")}
              />
              <TextInput label="Brand" {...form.getInputProps("brand")} />
              <Select
                label="Category"
                data={category}
                {...form.getInputProps("category")}
              />
            </Group>
          </Stack>
        </Paper>
        <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
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
              <Radio.Group {...form.getInputProps("conditions")} label="Conditions">
                <Group>
                <Radio label="New" value="New" />
                <Radio label="Second" value="Second" />
                </Group>
              </Radio.Group>
            </Stack>
          </Stack>
        </Paper>
        <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Photo of goods</p>
            <Divider />
            {file && (
              <Image
                maw={rem(300)}
                src={URL.createObjectURL(file) || null}
                withPlaceholder
              />
            )}
            <FileInput
              accept="image/*"
              placeholder="Pick a photo"
              onChange={setFile}
            />
          </Stack>
        </Paper>
        <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Description</p>
            <Divider />
            <Textarea
              placeholder="Description"
              {...form.getInputProps("description")}
            />
          </Stack>
        </Paper>
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
  );
}
