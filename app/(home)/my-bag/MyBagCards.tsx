"use client";
import {
    ActionIcon,
  Button,
  Checkbox,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
} from "@mantine/core";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

interface cartsData {
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
}

export default function MyBagCards({
  carts,
}: {
  carts: { cartsData: cartsData[] };
}) {
    const router = useRouter()
    const totalPrice = carts.cartsData.reduce((acc, c) => acc + c.price * c.quantity, 0)
    const itemTotalPrice = carts.cartsData.map((c) => {
        const itemPrice = c.price * c.quantity
        return (
            <div className="flex justify-between" key={c.name}>
                <p>{c.name.substring(0,10)}... <span className="text-sm text-slate-400">x{c.quantity}</span></p>
                <span>Rp {itemPrice.toLocaleString('id-ID')}</span>
            </div>
        )
    }
    )
  const cartItems = carts.cartsData.map((c) => (
    <Paper className="p-5" shadow="xl" withBorder key={c.name}>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image
            src={c.image}
            width={80}
            height={80}
            radius="md"
            className="object-contain shadow-sm aspect-square"
          />
          <div>
            <p className="font-bold max-w-prose">
              {c.name.substring(0, 20)}...
            </p>
            <p className="text-xs text-slate-400">{c.brand}</p>
          </div>
        </div>
        <div className="flex gap-3">
            <ActionIcon>
                <Minus />
            </ActionIcon>
            <span>{c.quantity}</span>
            <ActionIcon>
                <Plus />
            </ActionIcon>
        </div>
            <span className="font-bold">
            Rp {c.price.toLocaleString('id-ID')}
            </span>
      </div>
    </Paper>
  ));
  return (
    <div className="pt-10">
      <h1 className="text-3xl font-bold">My Bag</h1>
      <Grid className="pt-5">
        <Grid.Col lg={8}>
          <Stack>
            <Paper className="p-5" shadow="xl" withBorder>
              <Group position="apart">
                <Group>
                  <Checkbox />
                  <p>Select all items</p>
                </Group>
                <p>Delete</p>
              </Group>
            </Paper>
            <Stack>{cartItems}</Stack>
          </Stack>
        </Grid.Col>
        <Grid.Col lg={4}>
          <Paper className="p-5" shadow="xl" withBorder>
            <Stack>
              <p className="font-bold">Shopping summary</p>
              <Stack spacing={5}>

              {itemTotalPrice}
              </Stack>
              <Group position="apart">
                <p>Total price</p>
                <p className="font-bold">Rp. {totalPrice.toLocaleString('id-ID')}</p>
              </Group>
              <Button
              onClick={() => router.push('/checkout')}
                className="bg-red-600"
                color="red.6"
                variant="filled"
                radius="xl"
              >
                Buy
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
