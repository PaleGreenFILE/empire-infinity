"use client";
import { useCallback, useEffect } from "react";
import { onAuthStateChangedListener } from "@/lib/firebase";
import Cookies from "js-cookie";
import { IsLoggedIn, UserState } from "@/types";

const loggedOutUser: UserState = {
  currentUser: "loggedOut",
  emailVerified: false,
  email: "",
  accessToken: "",
};
export const AuthListener = ({
  setCurrentUser,
  setIsLoggedIn,
}: {
  setCurrentUser: (user: UserState) => void;
  setIsLoggedIn: (isLoggedIn: IsLoggedIn) => void;
}) => {
  const setCurrentUserCallback = useCallback(setCurrentUser, [setCurrentUser]);
  const setIsLoggedInCallback = useCallback(setIsLoggedIn, [setIsLoggedIn]);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: UserState) => {
      if (user) {
        const cookieContent = user.email;
        Cookies.set("cookieAuth", cookieContent, {
          expires: 7,
        });
        Cookies.set("accessToken", user.accessToken, {
          expires: 7,
        });
        setCurrentUser({
          currentUser: "loggedOut",
          emailVerified: user.emailVerified,
          email: user.email,
          accessToken: user.accessToken,
        });
        setIsLoggedIn(true);
      } else if (!user) {
        Cookies.remove("cookieAuth");
        Cookies.remove("accessToken");
        setCurrentUser(loggedOutUser);
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [
    setCurrentUserCallback,
    setIsLoggedInCallback,
    setCurrentUser,
    setIsLoggedIn,
  ]);
  return null;
};
