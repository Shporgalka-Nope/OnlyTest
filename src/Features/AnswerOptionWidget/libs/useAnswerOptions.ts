"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/state/useStoreHooks";
import { addErrNotification } from "@/Features/SelfClosingAlert/notificationStateSlice";

export const useAnswerOptions = (questionId: string) => {
  // const dispatch = useAppDispatch();
  // const { data, error, isError, isFetching, refetch } =
  //   useGetQuestionGetAnswersQuery({ questionId: questionId });
  // useEffect(() => {
  //   if (isError) {
  //     dispatch(addErrNotification(error));
  //   }
  // }, [isError, error, dispatch]);
  // return { answers: data, isError, isFetching, refetch };
};
