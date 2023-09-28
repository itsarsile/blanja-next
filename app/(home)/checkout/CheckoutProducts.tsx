"use client";
import { fetcher } from "@/src/utils/fetcher";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

interface cartsData {
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
}

export default function CheckoutProducts({
  carts,
}: {
  carts: { cartsData: cartsData[] };
}) {
  const { data: user } = useSession();
  const { data: address, isLoading } = useSWR(
    `/api/users/${user?.user.id}/shipping-address`,
    fetcher
  );

  const cartItems = carts.cartsData.map((c) => (
    <Paper className="p-5" shadow="xl" withBorder>
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
        <span className="font-bold">Rp {c.price.toLocaleString("id-ID")}</span>
      </div>
    </Paper>
  ));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const primaryAddress = address.find((a: any) => a.is_primary === true);
  const totalPrice = carts.cartsData.reduce(
    (acc, c) => acc + c.price * c.quantity,
    0
  );

  const itemTotalPrice = carts.cartsData.map((c) => {
    const itemPrice = c.price * c.quantity;
    return (
      <div className="flex justify-between">
        <p>
          {c.name.substring(0, 10)}...{" "}
          <span className="text-sm text-slate-400">x{c.quantity}</span>
        </p>
        <span>Rp {itemPrice.toLocaleString("id-ID")}</span>
      </div>
    );
  });
  return (
    <div className="pt-10">
      <p className="text-3xl font-bold">Checkout</p>
      <Grid className="pt-5">
        <Grid.Col lg={8}>
          <Stack>
            <p className="font-bold">Shipping address</p>
            <Paper
              key={address.id}
              className="border-2 p-10 text-left shadow-xl"
            >
              <Stack spacing={10}>
                <p className="font-semibold">
                  {primaryAddress.recipients_name}
                </p>
                <p>
                  {primaryAddress.save_address}, {primaryAddress.address}{" "}
                  {primaryAddress.city} {primaryAddress.postal_code}
                </p>
              </Stack>
              <div className="pt-5">
                <Button color="gray.6" variant="outline" radius="xl">
                  Choose another address
                </Button>
              </div>
            </Paper>
            {cartItems}
          </Stack>
        </Grid.Col>
        <Grid.Col lg={4}>
          <Paper className="p-5" shadow="xl" withBorder>
            <Stack>
              <p className="font-bold">Shopping summary</p>
              <Stack spacing={5}>{itemTotalPrice}</Stack>
              <Divider />
              <Group position="apart">
                <p>Total price</p>
                <p className="font-bold">
                  Rp. {totalPrice.toLocaleString("id-ID")}
                </p>
              </Group>
              <Button
                className="bg-red-600"
                color="red.6"
                variant="filled"
                radius="xl"
                onClick={() => {
                    modals.open({
                        title: "Payment",
                        children: (
                            <>
                                <Stack>
                                    <p>Payment method</p>
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-5">
                                        <Image src="/gopay-logo.png" width={50}/>
                                        <p>Gopay</p>
                                        </div>
                                        <Checkbox />
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-5">
                                        <Image src="/pos-indonesia.png" width={50}/>
                                        <p>Pos Indonesia</p>
                                        </div>
                                        <Checkbox />
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-5">
                                        <Image src="/mastercard.png" width={50}/>
                                        <p>Mastercard</p>
                                        </div>
                                        <Checkbox />
                                    </div>
                                    <Divider />
                                    <p className="font-bold">Shopping summary</p>
                                    <div className="flex justify-between">

                                    <p>Order</p>
                                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="pt-10">
                                        <Group position="apart">
                                        <Stack spacing={0.5}>
                                            <p className="font-bold">Shopping summary</p>
                                            <p className="text-red-600 font-bold">Rp {totalPrice.toLocaleString('id-ID')}</p>
                                        </Stack>
                                        <Button color="red.6" className="bg-red-600" w={100}>Buy</Button>
                                        </Group>
                                    </div>
                                </Stack>
                            </>
                        )
                    })
                }}
              >
                Select Payment
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
