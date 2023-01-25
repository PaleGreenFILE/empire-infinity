"use client";
import { createContext, useState } from "react";
import { AuthListener } from "@/lib/OnAuthListener/onAuthListener";
import { IsLoggedIn, UserState } from "@/types";

export const UserContext = createContext<{
  currentUser: UserState;
  isLoggedIn: boolean;
}>({
  currentUser: {
    currentUser: "loggedOut",
    emailVerified: false,
    email: "",
    accessToken: "",
  },
  isLoggedIn: false,
});

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<UserState>({
    currentUser: "loggedOut",
    emailVerified: false,
    email: "",
    accessToken: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<IsLoggedIn>(false);

  return (
    <UserContext.Provider value={{ currentUser, isLoggedIn }}>
      {children}
      <AuthListener
        setCurrentUser={setCurrentUser}
        setIsLoggedIn={setIsLoggedIn}
      />
    </UserContext.Provider>
  );
};
