import Header from "@/app/en/login/Header";
import { Suspense } from "react";
import Loading from "@/app/loading";

export default function RootLayout({ children }: any) {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <div>{children}</div>
      </Suspense>
    </div>
  );
}
