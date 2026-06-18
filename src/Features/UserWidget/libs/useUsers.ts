import { addErrNotification } from "@/Features/SelfClosingAlert/notificationStateSlice";
import {
  CreateUserDto,
  PatchUserDto,
  useDeleteUserDeleteMutation,
  useGetUserGetAllQuery,
  usePatchUserPatchMutation,
  usePostUserCreateMutation,
} from "@/state/apiAutogen";
import { useAppDispatch } from "@/state/useStoreHooks";
import { useEffect } from "react";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const {
    data: users,
    isError: isUsersError,
    error: usersError,
    isFetching: isUsersFetching,
    refetch: refetchUsers,
  } = useGetUserGetAllQuery();

  const [createUser, { isError, error, isLoading }] =
    usePostUserCreateMutation();

  const [
    patchUser,
    { isError: isPatchError, error: patchError, isLoading: isPatchLoading },
  ] = usePatchUserPatchMutation();

  const [
    deleteUser,
    { isError: isDeleteError, error: deleteError, isLoading: isDeleteLoading },
  ] = useDeleteUserDeleteMutation();

  const HandleCreate = async (data: CreateUserDto) => {
    await createUser({ createUserDto: data });
  };

  const HandleUpdate = async (data: PatchUserDto) => {
    await patchUser({ patchUserDto: data });
  };

  const HandleDelete = async (userId: string) =>
    await deleteUser({ userId: userId });

  useEffect(() => {
    if (isUsersError || isError) {
      dispatch(addErrNotification(usersError || error));
    }
  }, [isUsersError, isError, usersError, error]);

  return {
    users,
    isUsersFetching,
    isUsersError,
    refetchUsers,
    HandleCreate,
    HandleUpdate,
    HandleDelete,
    isDeleteLoading,
  };
};
