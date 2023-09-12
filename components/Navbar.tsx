"use client";
import {
  Burger,
  Button,
  Container,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  TextInput,
  createStyles,
  rem,
} from "@mantine/core";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <Header height={{ base: 70 }} className="shadow-lg">
      <Container className="flex items-center h-full">
        <Group className={`${classes.hiddenMobile} w-full`} position="apart">
          <Image src="/blanja.svg" width={73} height={20} alt="blanja-logo" />
          <TextInput
            placeholder="Search"
            radius="lg"
            rightSection={<Search className="w-4 h-4 text-gray-400" />}
            w={rem(500)}
          />
          <Group>
            <Link href="/login">
            <Button radius="xl" color="red.6" w={rem(100)}>
              Login
            </Button>
            </Link>
            <Link href="/register">
            <Button radius="xl" color="red.6" w={rem(100)} variant="outline">
              Sign Up
            </Button>
            </Link>
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
