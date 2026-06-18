import { addErrNotification } from "@/Features/SelfClosingAlert/notificationStateSlice";
import { useGetTestGetPublishedWidgetDataQuery } from "@/state/apiAutogen";
import { useAppDispatch } from "@/state/useStoreHooks";
import { useEffect } from "react";

export const useTestsWidgetData = () => {
  const dispatch = useAppDispatch();
  const { data, isError, error, isFetching, refetch } =
    useGetTestGetPublishedWidgetDataQuery();

  useEffect(() => {
    if (isError) {
      dispatch(addErrNotification(error));
    }
  }, [isError, error]);

  return {
    data,
    isFetching,
    isError,
    refetch,
  };
};
