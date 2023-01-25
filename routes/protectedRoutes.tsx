"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user.context";
import Cookies from "js-cookie";

export function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const { isLoggedIn, currentUser } = useContext(UserContext);
  const isLoggedInCookie =
    Cookies.get("cookieAuth") == currentUser?.email || false;
  const accessTokenValid = Cookies.get("accessToken") || false;

  if (!isLoggedIn || !isLoggedInCookie || !accessTokenValid) {
    router.replace("/");
  } else {
    return children;
  }
}
