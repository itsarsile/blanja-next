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
import { signIn } from "next-auth/react";
import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.onSubmit(async (values, _event) => {
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
      })
        .then(() => alert("Login successful"))
        .catch(() => alert("Invalid credentials"));
    } catch (error) {
      alert("Error while logging in");
    }
  });
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
            <form onSubmit={onSubmit}>
              <Tabs.Panel value="customer">
                <Stack>
                  <TextInput
                    placeholder="Email"
                    className="w-96"
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    placeholder="Password"
                    className="w-96"
                    {...form.getInputProps("password")}
                  />
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="seller">
                <Stack>
                  <TextInput
                    placeholder="Email"
                    className="w-96"
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    placeholder="Password"
                    className="w-96"
                    {...form.getInputProps("password")}
                  />
                </Stack>
              </Tabs.Panel>
              <Stack mt={rem(20)}>
                <Text color="red.6" align="right">
                  Forgot Password?
                </Text>
                <Button
                  styles={(theme) => ({
                    root: {
                      backgroundColor: theme.colors.red[9],
                      color: theme.white,
                    },
                  })}
                  unstyled
                  className="w-full h-12 rounded-full bg-red-600"
                  type="submit"
                >
                  Login
                </Button>
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
