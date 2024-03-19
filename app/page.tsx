"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/browse/home");
  });

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Link href={"/browse/home"}><Button size={"lg"} className="text-2xl">Ir para o APP</Button></Link>
    </div>
  );
}
