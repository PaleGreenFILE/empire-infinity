import Header from "@/app/en/register/Header";
import { Suspense } from "react";
import Loading from "@/app/loading";
export default function RootLayout({ children }: any) {
  return (
    <>
      <div>
        <Header />
      </div>
      <Suspense fallback={<Loading />}>
        <div>{children}</div>
      </Suspense>
    </>
  );
}
