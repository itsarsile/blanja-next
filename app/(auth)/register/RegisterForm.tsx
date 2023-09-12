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
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";

export default function RegisterForm() {
  const [activeTab, setActiveTab] = useState<string | null>("customer")
  console.log("🚀 ~ file: RegisterForm.tsx:18 ~ RegisterForm ~ activeTab:", activeTab)

  return (
    <Center className="h-screen">
      <Stack align="center">
        <Image src="/blanja.svg" alt="blanja-logo" width={135} height={50} />
        <Tabs
          unstyled
          onTabChange={setActiveTab}
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
            <form>
              <Tabs.Panel value="customer">
                <Stack>
                  <TextInput placeholder="Email" className="w-96" />
                  <PasswordInput placeholder="Password" className="w-96" />
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="seller">
                <Stack>
                  <TextInput placeholder="Name" className="w-96" />
                  <TextInput placeholder="Email" className="w-96" />
                  <TextInput placeholder="Phone number" className="w-96" />
                  <TextInput placeholder="Store name" className="w-96" />
                  <PasswordInput placeholder="Password" className="w-96" />
                </Stack>
              </Tabs.Panel>
              <Stack mt={rem(20)}>
                <Button
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
