"use client";
import {
  Button,
  Divider,
  FileInput,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import React from "react";

export default function SellProductSections({
  categories,
}: {
  categories: any[];
}) {
  const category = categories.map(category => {
      return category.name
    })
    console.log("🚀 ~ file: SellProductSections.tsx:22 ~ category:", category)
  return (
    <form>
      <Stack>
        <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Inventory</p>
            <Divider />
            <Group className="pt-5">
              <TextInput label="Name of goods" />
              <TextInput label="Brand" />
              <Select label="Category" data={category} />
            </Group>
          </Stack>
        </Paper>
        <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Item details</p>
            <Divider />
            <Stack>
              <NumberInput label="Unit price" />
              <NumberInput
                label="Stock"
                rightSection={<span className="pr-6">Buah</span>}
              />
            </Stack>
          </Stack>
        </Paper>
        <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Photo of goods</p>
            <Divider />
            <FileInput accept="image/*" placeholder="Pick a photo" />
          </Stack>
        </Paper>
        <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
          <Stack spacing="xs">
            <p className="text-2xl font-semibold">Description</p>
            <Divider />
            <Textarea placeholder="Description" />
          </Stack>
        </Paper>
        <Button
          color="red.6"
          className="bg-red-600 justify-end"
          variant="filled"
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
