import { Suspense } from "react";
import Loading from "@/app/loading";
import { ProtectedRoute } from "@/routes/protectedRoutes";
export default function RootLayout({ children }: any) {
  return (
    <div>
      <ProtectedRoute>
        <Suspense fallback={<Loading />}>
          <div>{children}</div>
        </Suspense>
      </ProtectedRoute>
    </div>
  );
}
