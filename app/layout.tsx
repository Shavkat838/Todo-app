"use client"
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./Components/Side-bar";
import { ClerkProvider} from "@clerk/nextjs"

import { usePathname } from "next/navigation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{


  const blockedPages=["/sign-in"] 
  const pathname=usePathname()

  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>My Todo App</title>
          <meta name="description" content="This is a description" />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className=" bg-neutral-950 min-h-screen flex  pt-[20px] ">
            <div className="max-w-[1460px] mx-auto  w-full min-h-[70vh] flex gap-[50px]">
              {!blockedPages.includes(pathname) ? <SideBar /> : ""}
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
