import Header from "@/app/en/dashboard/Header";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { ProtectedRoute } from "@/routes/protectedRoutes";
import { UserProvider } from "@/context/user.context";
import "./globals.css";
export default function RootLayout({ children }: any) {
  return (
    <html>
      <body className={"bg-[rgb(16,18,19)]"}>
        <UserProvider>
          <Header />
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <div>{children}</div>
            </Suspense>{" "}
          </ProtectedRoute>
        </UserProvider>
      </body>
    </html>
  );
}
