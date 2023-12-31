"use client";
import { fetcher } from "@/src/utils/fetcher";
import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Container,
  Divider,
  Group,
  Header,
  HoverCard,
  MediaQuery,
  Menu,
  Navbar,
  Stack,
  Text,
  TextInput,
  createStyles,
  rem,
} from "@mantine/core";
import { Bell, Mail, Search, ShoppingCart } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function NavigationBar() {
  const { data, status, update } = useSession();
  const { data: usersData } = useSWR(`/api/users/${data?.user.id}`, fetcher);
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <Header height={{ base: 70 }} className="shadow-xl" zIndex={10}>
      <Container className="flex items-center h-full">
        <Group className={`${classes.hiddenMobile} w-full`} position="apart">
          <Link href="/">
            <Image
              priority
              src="/blanja.svg"
              width={73}
              height={20}
              alt="blanja-logo"
            />
          </Link>
          <TextInput
            placeholder="Search"
            radius="lg"
            rightSection={<Search className="w-4 h-4 text-gray-400" />}
            w={rem(500)}
          />
          <Group>
            {status === "unauthenticated" ? (
              <>
                <Link href="/login">
                  <Button
                    radius="xl"
                    className="bg-red-600"
                    color="red.6"
                    w={rem(100)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    radius="xl"
                    color="red.6"
                    w={rem(100)}
                    variant="outline"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-gray-400 flex gap-5">
                  <Mail className="w-6 h-6" />
                  <Bell className="w-6 h-6" />
                  <Group position="center">
                  <HoverCard width={280} withArrow shadow="xl">
                    <HoverCard.Target>
                      <Link href="/my-bag">
                      <ShoppingCart className="w-6 h-6" />
                      </Link>
                    </HoverCard.Target>
                    <HoverCard.Dropdown className="pt-10">
                      <Stack spacing={5}>
                      <Text size="xs">
                        Shopping Cart
                        </Text>
                        <Divider />
                      </Stack>
                      <Stack>
                        
                      </Stack>
                    </HoverCard.Dropdown>
                  </HoverCard>
                  </Group>
                  <Menu withArrow shadow="lg" width={rem(150)}>
                    <Menu.Target>
                      <ActionIcon>
                        <Avatar
                          radius="xl"
                          src={
                            usersData && usersData?.userWithoutPassword?.avatar
                          }
                        />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Link href={`/edit-profile/${data?.user.id}`}>
                        <Menu.Item>Profile</Menu.Item>
                      </Link>
                      <Menu.Item component="button" onClick={() => signOut()}>
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </>
            )}
          </Group>
        </Group>
        <Group position="apart" className={`${classes.hiddenDesktop} w-full`}>
          <Image src="/blanja.svg" width={73} height={20} alt="blanja-logo" />
          <Burger
            opened={opened}
            onClick={(o) => setOpened((o) => !o)}
            color={theme.colors.gray[5]}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Container>
    </Header>
  );
}
