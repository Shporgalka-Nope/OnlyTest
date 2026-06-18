"use client";

import Admin from "@/Features/Dashboards/Admin";
import Student from "@/Features/Dashboards/Student";
import Teacher from "@/Features/Dashboards/Teacher";
import { useAppSelector } from "@/state/useStoreHooks";
import { useEffect } from "react";

export default function Home() {
  const userRole = useAppSelector((state) => state.local.user.Role);
  useEffect(() => {
    console.log(userRole);
  }, [userRole]);
  return (
    <div className="d-flex justify-content-center align-items-center m-3">
      {userRole === "admin" && <Admin />}
      {userRole === "teacher" && <Teacher />}
      {userRole === "student" && <Student />}
    </div>
  );
}
