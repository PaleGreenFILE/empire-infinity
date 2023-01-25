import { Suspense } from "react";
import Loading from "@/app/loading";
import { UserProvider } from "@/context/user.context";
import { ProtectedRoute } from "@/routes/protectedRoutes";
import Header from "@/app/en/dashboard/Header";

export default function RootLayout({ children }: any) {
  return (
    <div>
      <UserProvider>
        <ProtectedRoute>
          <Suspense fallback={<Loading />}>
            <div>{children}</div>{" "}
          </Suspense>
        </ProtectedRoute>
      </UserProvider>
    </div>
  );
}
