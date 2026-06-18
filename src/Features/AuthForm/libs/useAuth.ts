import {
  AuthenticationDto,
  ProblemDetails,
  usePostAuthenticationLoginWithPasswordMutation,
} from "@state/apiAutogen";
import {
  addErrNotification,
  addNotification,
} from "@/Features/SelfClosingAlert/notificationStateSlice";
import { useAppDispatch, useAppSelector } from "@/state/useStoreHooks";
import { SignInForm } from "../Entities/SignInFormFields";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";

export const useAuth = () => {
  const isEmailConfirmed = useAppSelector(
    (store) => store.local.user.IsEmailConfirmed,
  );
  const dispatch = useAppDispatch();
  const [login, { error }] = usePostAuthenticationLoginWithPasswordMutation();

  const handleLogin = async (data: SignInForm) => {
    const dto: AuthenticationDto = {
      email: data.email,
      password: data.password,
    };
    await login({ authenticationDto: dto });
  };

  useEffect(() => {
    dispatch(addErrNotification(error));
  }, [error]);

  return { handleLogin, isEmailConfirmed };
};
