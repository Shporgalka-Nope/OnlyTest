"use client";
import {
  CreateTestDto,
  usePostTestCreateMutation,
  EditTestInfoDto,
  usePatchTestPatchMutation,
  TestIdDto,
  apiAutogen,
} from "@/state/apiAutogen";
import { useEffect } from "react";
import { useAppDispatch } from "@/state/useStoreHooks";
import {
  addErrNotification,
  addNotification,
} from "@/Features/SelfClosingAlert/notificationStateSlice";
import { addTestFormData } from "./testFormSlice";

export const useTestForm = () => {
  const dispatch = useAppDispatch();
  const [login, { error: testCreateError, isError: isTestCreateError }] =
    usePostTestCreateMutation();
  const [patch, { error: testPatchError, isError: isTestPatchError }] =
    usePatchTestPatchMutation();
  const [trigger, { error: testFindError, isError: isTestFindError }] =
    apiAutogen.endpoints.getTestGet.useLazyQuery();

  const HandleCreate = async (data: CreateTestDto) => {
    const responseData = await login({ createTestDto: data }).unwrap();
    dispatch(addTestFormData(responseData));
    return responseData;
  };

  const HandleEdit = async (data: EditTestInfoDto) => {
    const responseData = await patch({ editTestInfoDto: data }).unwrap();
    dispatch(addTestFormData(responseData));
    dispatch(
      addNotification({ text: "Изменения сохранены", variant: "success" }),
    );
  };

  const FindById = async (data: string) => {
    const responseData = await trigger({ testId: data }).unwrap();
    dispatch(addTestFormData(responseData));
  };

  useEffect(() => {
    if (isTestCreateError || isTestPatchError || isTestFindError) {
      dispatch(
        addErrNotification(testCreateError || testPatchError || testFindError),
      );
    }
  }, [
    isTestCreateError,
    isTestPatchError,
    isTestFindError,
    testCreateError,
    testPatchError,
    testFindError,
    dispatch,
  ]);

  return {
    HandleCreate,
    HandleEdit,
    FindById,
  };
};
