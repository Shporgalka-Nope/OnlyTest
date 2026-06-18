"use client";
import AuthForm from "@/Features/AuthForm/authForm";
import DMSF from "@/Features/DynamicMultiStepForm/DMSF";
import VerifyEmail from "@/Features/VerifyEmail/VerifyEmail";
import AuthSVG from "@/app/auth/UI/AuthSVG";
import { useAppSelector } from "@/state/useStoreHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const accessToken = useAppSelector((state) => state.local.user.AccessToken);

  const RedirectToDashboard = () => {
    // console.log("AUTH");
    router.push("/");
  };

  useEffect(() => {
    if (accessToken) RedirectToDashboard();
  }, [accessToken]);

  return (
    <div className="h-100 d-flex flex-column flex-md-row justify-content-center align-items-center">
      <div
        style={{ backgroundColor: "var(--accent-color)" }}
        className="w-100 h-100 d-md-flex d-none justify-content-center align-items-center"
      >
        <AuthSVG></AuthSVG>
      </div>

      <div className="d-flex gap-3 justify-content-center align-items-center w-100">
        <DMSF onFinish={RedirectToDashboard} id="register-form">
          <AuthForm />
          <VerifyEmail />
        </DMSF>
      </div>
    </div>
  );
}
