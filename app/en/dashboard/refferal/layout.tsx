import Header from "@/app/en/Header";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { ProtectedRoute } from "@/routes/protectedRoutes";
export default function RootLayout({ children }: any) {
  return (
    <>
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <div>{children}</div>
        </Suspense>
      </ProtectedRoute>
    </>
  );
}
