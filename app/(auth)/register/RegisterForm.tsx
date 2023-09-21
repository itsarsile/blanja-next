"use client";
import {
  Button,
  Center,
  PasswordInput,
  Stack,
  Tabs,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [activeTab, setActiveTab] = useState<string | null>("customer");
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      storeName: "",
      phoneNumber: "",
      name: "",
      role: "customer",
    },
  });

  const onSubmit = form.onSubmit(async (values) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/register/api`, values)
      .then((_) => {
          setIsLoading(false)
        }) 
      .catch((error) => console.error(error));
  });

  return (
    <Center className="h-screen">
      <Stack align="center">
        <Image src="/blanja.svg" alt="blanja-logo" width={135} height={50} />
        <Tabs
          unstyled
          onTabChange={(value: any) => form.setFieldValue("role", value)}
          defaultValue={activeTab}
          styles={(theme) => ({
            tab: {
              ...theme.fn.focusStyles(),
              border: `${rem(1)} solid ${theme.colors.gray[5]}`,
              color: theme.colors.gray[5],
              "&:not(:first-of-type)": {
                borderLeft: 0,
              },
              "&:first-of-type": {
                borderTopLeftRadius: theme.radius.md,
                borderBottomLeftRadius: theme.radius.md,
              },
              "&:last-of-type": {
                borderTopRightRadius: theme.radius.md,
                borderBottomRightRadius: theme.radius.md,
              },
              "&[data-active]": {
                backgroundColor: theme.colors.red[9],
                borderColor: theme.colors.red[9],
                color: theme.white,
              },
              width: `${rem(123)}`,
              height: `${rem(48)}`,
            },
          })}
        >
          <Center>
            <Tabs.List>
              <Tabs.Tab value="customer">Customer</Tabs.Tab>
              <Tabs.Tab value="seller">Seller</Tabs.Tab>
            </Tabs.List>
          </Center>
          <Center mt={rem(25)}>
            <form onSubmit={onSubmit}>
              <Tabs.Panel value="customer">
                <Stack>
                  <TextInput placeholder="Email" className="w-96" {...form.getInputProps("email")}/>
                  <PasswordInput placeholder="Password" className="w-96" {...form.getInputProps("password")}/>
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="seller">
                <Stack>
                  <TextInput placeholder="Name" className="w-96" {...form.getInputProps("name")}/>
                  <TextInput placeholder="Email" className="w-96" {...form.getInputProps("email")}/>
                  <TextInput placeholder="Phone number" className="w-96" {...form.getInputProps("phoneNumber")}/>
                  <TextInput placeholder="Store name" className="w-96" {...form.getInputProps("storeName")}/>
                  <PasswordInput placeholder="Password" className="w-96" {...form.getInputProps("password")}/>
                </Stack>
              </Tabs.Panel>
              <Stack mt={rem(20)}>
                <Button
                  type="submit"
                  styles={(theme) => ({
                    root: {
                      backgroundColor: theme.colors.red[9],
                      color: theme.white,
                    },
                  })}
                  unstyled
                  className="w-full h-12 rounded-full"
                >
                  Register
                </Button>
                <Text className="flex gap-1 justify-center">
                  Already have a Blanja account?{" "}
                  <Text color="red.6">
                    <Link href="/login">Login</Link>
                  </Text>
                </Text>
              </Stack>
            </form>
          </Center>
        </Tabs>
      </Stack>
    </Center>
  );
}
