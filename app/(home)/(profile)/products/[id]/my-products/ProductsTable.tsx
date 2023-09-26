"use client"
import { Divider, Paper, Stack } from "@mantine/core";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useSWR from "swr";

export default function ProductsTable({data}: any) {
  return (
    <Paper shadow="xl" withBorder className=" p-3 lg:p-16">
      <Stack spacing="xs">
        <p className="text-2xl font-semibold">My Products</p>
        <p className="text-slate-400">Manage your products data</p>
        <Divider />
      </Stack>
      <div className="pt-10">
      <DataTable data={data} columns={columns} />
      </div>
    </Paper>
  );
}