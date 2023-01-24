"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: any) {
  const { isLoggedIn } = useContext(UserContext);
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/");
    return;
  } else if (isLoggedIn) {
    return children;
  }
}
