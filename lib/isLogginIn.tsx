"use client";
import { useEffect, useState } from "react";

export function useIsLoggedIn(currentUser: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [currentUser]);

  if (isLoading) return <div>Loading...</div>;
  console.log("useIsLoggedInAFTER", currentUser);
  console.log("log or not", isLoggedIn);
  return isLoggedIn;
}
