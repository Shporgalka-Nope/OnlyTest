import {
  removeAnswerData,
  setAnswerData,
} from "@/Features/CreateTestSequence/CreateTestForm/libs/testFormSlice";
import {
  addErrNotification,
  addNotification,
} from "@/Features/SelfClosingAlert/notificationStateSlice";
import {
  CreateAnswerOptionDto,
  PatchAnswerOptionDto,
  useDeleteAnswerOptionDeleteMutation,
  usePatchAnswerOptionPatchMutation,
  usePostAnswerOptionCreateMutation,
} from "@/state/apiAutogen";
import { useAppDispatch } from "@/state/useStoreHooks";
import { useEffect } from "react";

export const useAnswer = () => {
  const dispatch = useAppDispatch();
  const [create, { isError: isCreateError, error: createError }] =
    usePostAnswerOptionCreateMutation();

  const [edit, { isError: isPatchError, error: patchError }] =
    usePatchAnswerOptionPatchMutation();

  const [deleteAnswerOption, { isError: isDeleteError, error: deleteError }] =
    useDeleteAnswerOptionDeleteMutation();

  const createNewAnswer = async (data: CreateAnswerOptionDto) => {
    const responseData = await create({ createAnswerOptionDto: data }).unwrap();
    dispatch(setAnswerData(responseData));
    return responseData;
  };

  const editAnswer = async (data: PatchAnswerOptionDto) => {
    const responseData = await edit({ patchAnswerOptionDto: data }).unwrap();
    console.log(responseData);
    dispatch(setAnswerData(responseData));
    dispatch(
      addNotification({ text: "Изменения сохранены", variant: "success" }),
    );
    return responseData;
  };

  const deleteAnswer = async (answerId: string, questionId: string) => {
    await deleteAnswerOption({
      answerOptionId: answerId,
    });
    dispatch(removeAnswerData({ answerId: answerId, questionId: questionId }));
    dispatch(addNotification({ text: "Объект удалён", variant: "warning" }));
  };

  useEffect(() => {
    if (isCreateError || isPatchError || isDeleteError) {
      dispatch(addErrNotification(createError || patchError || deleteError));
    }
  }, [
    isCreateError,
    isPatchError,
    isDeleteError,
    createError,
    patchError,
    deleteError,
    dispatch,
  ]);

  return {
    createNewAnswer,
    editAnswer,
    deleteAnswer,
  };
};
