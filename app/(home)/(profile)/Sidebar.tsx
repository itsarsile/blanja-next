"use client";

import { fetcher } from "@/src/utils/fetcher";
import { Avatar, Group, Navbar, ScrollArea, Stack } from "@mantine/core";
import {
  Box,
  Clipboard,
  MapPin,
  PencilIcon,
  ShoppingBasket,
  Store,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { LinksGroup } from "../_components/LinksGroup";

export default function Sidebar() {
  const pathname = usePathname();
  const { data, update } = useSession();

  const { data: usersData, isLoading } = useSWR(
    `/api/users/${data?.user.id}`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const user = usersData.userWithoutPassword;

  const storeMenu = [
    {
      label: "Store",
      icon: Store,
      iconClassName: "bg-cyan-600 text-white p-2 rounded-full",
      links: [
        { label: "Store Profile", link: `/edit-store-profile/${user?.id}` },
      ],
    },
    {
      label: "Product",
      icon: Box,
      iconClassName: "bg-red-600 text-white p-2 rounded-full",
      links: [
        { label: "My Products", link: `/products/${user?.id}/my-products` },
        { label: "Sell Product", link: `/products/${user?.id}/sell` },
      ],
    },
    {
      label: "Order",
      icon: ShoppingBasket,
      iconClassName: "bg-green-600 text-white p-2 rounded-full",
      links: [{ label: "My order", link: `/orders/${user?.id}` }],
    },
  ];

  const StoreLinks = storeMenu.map((item) => (
    <LinksGroup {...item} key={item.label} pathName={pathname} />
  ));

  return (
    <ScrollArea>
    <Navbar className="w-80 p-10" zIndex={-10} width={{ base: 300 }}>
      <Navbar.Section>
        <div className="flex items-center gap-5">
          <Avatar
            size="xl"
            src={user?.avatar}
            styles={{
              root: {
                borderRadius: "100%",
              },
            }}
          />
          <div className="flex flex-col">
            <p className="font-bold">{user?.name}</p>
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
                <div
                  className={
                    pathname.startsWith("/edit-profile")
                      ? "bg-blue-600 p-2 rounded-full text-white transition-all ease-in-out ring-2"
                      : "bg-blue-600 p-2 rounded-full text-white"
                  }
                >
                  <User />
                </div>
                <p
                  className={
                    pathname.startsWith("/edit-profile")
                      ? "font-bold transition-all ease-in-out"
                      : "text-slate-500 transition-all ease-in-out"
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
            {data?.user.role === "seller" && (
              <>
                {StoreLinks}
              </>
            )}
          </Stack>
        </div>
      </Navbar.Section>
    </Navbar>
    </ScrollArea>
  );
}
