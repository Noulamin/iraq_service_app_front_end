import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "App",
  description: "Description",
  // other metadata
};

export default function Home() {
  redirect("/signin");
}