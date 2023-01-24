import { useEffect } from "react";
import { onAuthStateChangedListener } from "@/lib/firebase";
import { User } from "@firebase/auth";

export const AuthListener = ({ setCurrentUser }: any) => {
  useEffect(() => {
    onAuthStateChangedListener((user: User | null) => {
      setCurrentUser(user);
    });
  }, [setCurrentUser]);

  return null;
};
