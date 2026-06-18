import { addErrNotification } from "@/Features/SelfClosingAlert/notificationStateSlice";
import {
  CreateDisciplineDto,
  PatchDisciplineDto,
  useDeleteDisciplinesDeleteMutation,
  useGetDisciplinesGetQuery,
  usePatchDisciplinesPatchMutation,
  usePostDisciplinesCreateMutation,
} from "@/state/apiAutogen";
import { useAppDispatch } from "@/state/useStoreHooks";
import { useEffect } from "react";

export const useDisciplines = () => {
  const dispatch = useAppDispatch();
  const [create, { isError: isCreateError, error: createError }] =
    usePostDisciplinesCreateMutation();

  const {
    data: disciplines,
    isError: isReadError,
    error: readError,
    isFetching: isReadFetching,
    refetch,
  } = useGetDisciplinesGetQuery();

  const [patch, { isError: isPatchError, error: patchError }] =
    usePatchDisciplinesPatchMutation();

  const [deleteDisc] = useDeleteDisciplinesDeleteMutation();

  const HandleCreate = async (data: CreateDisciplineDto) => {
    await create({ createDisciplineDto: data });
  };

  const HandlePatch = async (data: PatchDisciplineDto) => {
    await patch({ patchDisciplineDto: data });
  };

  const HandleDelete = async (data: string) => {
    await deleteDisc({ disciplineId: data });
  };

  useEffect(() => {
    if (isCreateError || isPatchError) {
      dispatch(addErrNotification(createError || patchError));
    }
  }, [isCreateError, isPatchError, createError, patchError]);

  return {
    disciplines,
    isReadFetching,
    isReadError,
    refetch,
    HandleCreate,
    HandlePatch,
    HandleDelete,
  };
};
