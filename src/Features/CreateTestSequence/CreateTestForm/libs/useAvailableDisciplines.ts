import { translateError } from "@/Features/SelfClosingAlert/libs/translateError";
import { addErrNotification } from "@/Features/SelfClosingAlert/notificationStateSlice";
import { useGetUserGetAvailableDisciplinesQuery } from "@/state/apiAutogen";
import { useAppDispatch } from "@/state/useStoreHooks";
import { useEffect } from "react";

export const useAvailableDisciplines = () => {
  const dispatch = useAppDispatch();
  const { data, error, isError, isFetching, refetch } =
    useGetUserGetAvailableDisciplinesQuery();

  useEffect(() => {
    if (isError) {
      dispatch(addErrNotification(error));
    }
  }, [isError, error, dispatch]);

  return { disciplines: data?.disciplines, isError, isFetching, refetch };
};
