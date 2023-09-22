import React from "react";
import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    return redirect('/')
  } 
  return (
    <div>
      <LoginForm />
    </div>
  );
}
