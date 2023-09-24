"use client";
import { Divider, Paper, Stack } from "@mantine/core";
import React from "react";

export default function EditAddressCards() {
  return (
    <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
      <Stack spacing="xs">
        <p className="text-2xl font-semibold">Choose another address</p>
        <p className="text-slate-400">Manage your shipping address</p>
        <Divider />
      </Stack>
      <Stack className="pt-5 lg:pt-10">
        <Paper className="border-2 border-dashed p-10 text-center" component="button">
            <p className="text-slate-400">Add new address</p>
        </Paper>
      </Stack>
    </Paper>
  );
}
