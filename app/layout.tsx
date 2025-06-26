"use client";
import "./globals.css";
import "./data-tables-css.css";
import Providers from "@/components/Providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ReactNode, useEffect } from "react";
import "./satoshi.css";
import Head from "next/head";

export default function RootLayout({ children }: { children: ReactNode }) {

  useEffect(() => {
    document.title = "App"
  }, [])

  return (
    <html suppressHydrationWarning lang="en">
      <Head>
        <title>App</title>
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics gaId="G-7DPND867D2" />
    </html>
  );
}
