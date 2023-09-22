"use client";

import { fetcher } from "@/src/utils/fetcher";
import { Avatar, Group, Navbar, Stack } from "@mantine/core";
import { Clipboard, MapPin, PencilIcon, User, UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname.startsWith("/edit-profile"));
  const { data } = useSession();

  const { data: usersData, isLoading } = useSWR(`/api/users/${data?.user.id}`, fetcher);
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  const user = usersData.userWithoutPassword
  console.log("🚀 ~ file: Sidebar.tsx:24 ~ Sidebar ~ user:", user)
  
  
  return (
    <Navbar className="w-80 p-10" zIndex={-10} width={{ base: 300 }}>
      <Navbar.Section>
        <div className="flex items-center gap-5">
          <Avatar size="xl" radius="xl" />
          <div className="flex flex-col">
            <p className="font-bold">{user.name}</p>
            <p className="text-xs flex items-center gap-1 text-slate-400">
              <PencilIcon className="w-3" />
              Ubah Profil
            </p>
          </div>
        </div>
      </Navbar.Section>
      <Navbar.Section className="pt-10 pl-5">
        <div className="">
          <Stack spacing="xl">
            <Link href={`/edit-profile/${data?.user.id}`}>
              <Group>
                <div className="bg-blue-600 p-2 rounded-full text-white">
                  <User />
                </div>
                <p
                  className={
                    pathname.startsWith("/edit-profile")
                      ? "font-bold"
                      : "text-slate-500"
                  }
                >
                  My Account
                </p>
              </Group>
            </Link>
            <Link href={`/shipping-address/${data?.user.id}`}>
              <Group>
                <div className="p-2 rounded-full text-white bg-orange-400">
                  <MapPin />
                </div>
                <p
                  className={
                    pathname.startsWith("/shipping-address")
                      ? "font-bold transition-all ease-in-out"
                      : "text-slate-500"
                  }
                >
                  Shipping Address
                </p>
              </Group>
            </Link>
            <Link href={`/my-orders/${data?.user.id}`}>
              <Group>
                <div className="p-2 rounded-full text-white bg-pink-400">
                  <Clipboard />
                </div>
                <p
                  className={
                    pathname.startsWith("/my-orders")
                      ? "font-bold transition-all ease-in-out"
                      : "text-slate-500"
                  }
                >
                  My Order
                </p>
              </Group>
            </Link>
          </Stack>
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
