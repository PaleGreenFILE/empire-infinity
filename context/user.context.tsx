"use client";
import { createContext, useState } from "react";
import { AuthListener } from "@/lib/OnAuthListener/onAuthListener";

export const UserContext = createContext({
  currentUser: null,
  isLoggedIn: false,
});
export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {
    currentUser,
    isLoggedIn,
  };
  return (
    // @ts-ignore
    <UserContext.Provider value={value}>
      {children}
      <AuthListener
        setCurrentUser={setCurrentUser}
        setIsLoggedIn={setIsLoggedIn}
      />
    </UserContext.Provider>
  );
};
