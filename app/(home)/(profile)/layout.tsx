import React from "react";
import Sidebar from "./Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SWRConfig } from "swr"

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <div>
      <div className="absolute lg:block hidden left-0">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}
