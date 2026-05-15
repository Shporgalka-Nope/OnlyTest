"use client";

import TestsWidget from "@/Features/TestsWidget/TestsWidget";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const HandleCreate = () => {
    router.push("/Tests/Create");
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-3">
      <TestsWidget OnCreate={HandleCreate} Title="Список доступных тестов" />
    </div>
  );
}
