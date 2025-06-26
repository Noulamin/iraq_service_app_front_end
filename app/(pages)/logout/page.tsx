"use client";
import { useRouter } from "next/navigation";

const logout = () => {
  const router = useRouter();
  localStorage.clear();
  router.push("/");
};

export default logout;
