import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "App",
  description: "Access 60+ Tools and Services For Lowest Price!",
  // other metadata
};

export default function Home() {
  redirect("/signin");
}