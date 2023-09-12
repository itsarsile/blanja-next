import NavigationBar from "@/components/Navbar";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <div className="container max-w-5xl mx-auto">
      {children}
      </div>
    </>
  );
}
