import {
  AuthenticationDto,
  ProblemDetails,
  usePostAuthenticationLoginWithPasswordMutation,
} from "@state/apiAutogen";
import { addNotification } from "@/Features/SelfClosingAlert/notificationStateSlice";
import { translateUserAuthError } from "../../SelfClosingAlert/libs/translateUserAuthError";
import { translateNetworkError } from "@/Features/SelfClosingAlert/libs/translateNetworkError";
import { useAppDispatch, useAppSelector } from "@/state/useStoreHooks";
import { SignInForm } from "../Entities/SignInFormFields";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";

export const useAuth = () => {
  const isEmailConfirmed = useAppSelector(
    (store) => store.user.IsEmailConfirmed,
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
    let translatedError: string;
    if (error) {
      translatedError = (error as FetchBaseQueryError).data
        ? translateUserAuthError[
            ((error as FetchBaseQueryError).data as ProblemDetails).detail! ||
              "Неизвестная ошибка"
          ]
        : translateNetworkError[(error as SerializedError).message!] ||
          "Неизвестная ошибка";

      dispatch(addNotification({ text: translatedError, variant: "warning" }));
    }
  }, [error]);

  return { handleLogin, isEmailConfirmed };
};
