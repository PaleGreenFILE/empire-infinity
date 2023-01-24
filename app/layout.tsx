import "./globals.css";
import { Suspense } from "react";
import { ATopLevelComponent, Provider } from "@/components/ToastProvider";
import Loading from "@/app/loading";
import { UserProvider } from "@/context/user.context";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Provider>
            <ATopLevelComponent />
            <Suspense fallback={<Loading />}>
              <div>{children}</div>
            </Suspense>
          </Provider>
        </UserProvider>
      </body>
    </html>
  );
}
