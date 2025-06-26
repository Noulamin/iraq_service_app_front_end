import React, { FunctionComponent, PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import PublicRoutes from "@/components/PublicRoutes";

export const metadata: Metadata = {
  title: "App",
  description: "Access 60+ Tools and Services For Lowest Price!",
};

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <PublicRoutes>
      <main className="h-[100vh]">{children}</main>
    </PublicRoutes>
  );
};

export default AuthLayout;
