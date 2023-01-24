import "../../globals.css";
import {Suspense} from "react";
import Loading from "@/app/en/register/loading";
import Header from "@/app/en/register/Header";


export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html>
        <head/>
        <body>
        <Suspense fallback={<Loading/>}>
           <Header/>
            {children}
        </Suspense>
        </body>
        </html>
    );
}
