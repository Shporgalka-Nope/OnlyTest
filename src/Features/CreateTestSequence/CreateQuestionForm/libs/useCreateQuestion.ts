import {
  CreateQuestionDto,
  PatchQuestionDto,
  useDeleteQuestionDeleteMutation,
  usePatchQuestionPatchMutation,
  usePostQuestionCreateMutation,
} from "@/state/apiAutogen";
import { useEffect } from "react";
import { useAppDispatch } from "@/state/useStoreHooks";
import {
  addErrNotification,
  addNotification,
} from "@/Features/SelfClosingAlert/notificationStateSlice";
import {
  removeQuestionData,
  setQuestionData,
} from "../../CreateTestForm/libs/testFormSlice";

export const useCreateQuestion = () => {
  const dispatch = useAppDispatch();
  const [
    login,
    { error: questionCreateError, isError: isQuestionCreateError },
  ] = usePostQuestionCreateMutation();
  const [patch, { error: questionPatchError, isError: isQuestionPatchError }] =
    usePatchQuestionPatchMutation();
  const [
    deleteQuestion,
    { error: questionDeleteError, isError: isQuestionDeleteError },
  ] = useDeleteQuestionDeleteMutation();

  const handleCreate = async (data: CreateQuestionDto) => {
    const responseData = await login({ createQuestionDto: data }).unwrap();
    dispatch(setQuestionData(responseData));
    return responseData;
  };

  const handleEdit = async (data: PatchQuestionDto) => {
    const responseData = await patch({ patchQuestionDto: data }).unwrap();
    dispatch(setQuestionData(responseData));
    dispatch(
      addNotification({ text: "Изменения сохранены", variant: "success" }),
    );
    return responseData;
  };

  const handleDelete = async (questionId: string) => {
    await deleteQuestion({ questionId: questionId });
    dispatch(removeQuestionData(questionId));
    dispatch(addNotification({ text: "Объект удалён", variant: "warning" }));
  };

  useEffect(() => {
    if (
      isQuestionCreateError ||
      isQuestionPatchError ||
      isQuestionDeleteError
    ) {
      dispatch(
        addErrNotification(
          questionCreateError || questionPatchError || questionDeleteError,
        ),
      );
    }
  }, [
    isQuestionCreateError,
    isQuestionPatchError,
    isQuestionDeleteError,
    questionCreateError,
    questionPatchError,
    questionDeleteError,
    dispatch,
  ]);

  return {
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
