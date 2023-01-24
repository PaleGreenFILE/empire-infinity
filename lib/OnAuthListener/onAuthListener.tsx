import { useEffect } from "react";
import { onAuthStateChangedListener } from "@/lib/firebase";

export const AuthListener = ({ setCurrentUser, setIsLoggedIn }: any) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);
  return null;
};
