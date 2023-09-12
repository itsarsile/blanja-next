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
import React from "react";

export default function LoginForm() {
  return (
    <Center className="h-screen">
      <Stack align="center">
        <Image src="/blanja.svg" alt="blanja-logo" width={135} height={50} />
        <p>Please login with your account</p>
        <Tabs
          unstyled
          defaultValue="customer"
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
                  <TextInput placeholder="Email" className="w-96" />
                  <PasswordInput placeholder="Password" className="w-96" />
                </Stack>
              </Tabs.Panel>
              <Stack mt={rem(20)}>
                <Text color="red.6" align="right">Forgot Password?</Text>
              <Button styles={(theme) => ({
                root: {
                    backgroundColor: theme.colors.red[9],
                    color: theme.white
                }
              })} unstyled className="w-full h-12 rounded-full">Login</Button>
              <Text className="flex gap-1 justify-center">
                  Don&apos;t have a Blanja account?{" "}
                  <Text color="red.6">
                    <Link href="/register">Register</Link>
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
