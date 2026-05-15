import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { removeNotification } from "../notificationStateSlice";
import { useEffect } from "react";

export default function useAlertDismissable(
  notificationId: string,
  secondsDelay: number,
) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timer = setTimeout(
      () => dispatch(removeNotification(notificationId)),
      secondsDelay * 1000,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [notificationId, secondsDelay, dispatch]);

  function handleDismiss() {
    dispatch(removeNotification(notificationId));
  }

  return { handleDismiss };
}
