import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import { IUser } from "../interfaces/user";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postUser,
  putUser,
} from "../services/api/endpoints/user";

export function useUser() {
  const { updateModalEdit, updateModalDelete } = useModalContext();
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();

  const fetchAllUsers = async () => {
    try {
      const { data } = await getAllUsers();

      return data as IUser[];
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const fetchUserById = async (id: number) => {
    try {
      const { data } = await getUserById(id);

      return data as IUser;
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const updateUser = async (dataEdit: IUser) => {
    try {
      const { data } = await putUser(dataEdit);
      updateModalEdit("isOpen", false);

      return data as IUser;
    } catch (err) {
      return false;
    }
  };

  const postNewUser = async (dataEdit: IUser) => {
    try {
      const { data } = await postUser(dataEdit);
      updateModalEdit("isOpen", false);

      return data as IUser;
    } catch (err) {
      return false;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const { data } = await deleteUserById(id);
      updateModalDelete("isOpen", false);

      return data;
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const { refetch, isLoading, isRefetching, data } = useQuery({
    queryKey: [queryKey.USERS],
    queryFn: () => fetchAllUsers(),
    enabled: !!loggedUser,
    refetchOnMount: false,
  });

  const userSelectOptions = useMemo(() => {
    const list: TSelectOptions[] =
      data?.map((item) => ({
        value: item.id,
        name: item.nome,
      })) || [];

    return list;
  }, [data]);

  return {
    deleteUser,
    fetchAllUsers,
    postNewUser,
    updateUser,
    fetchUserById,
    refetch,
    isLoading,
    isRefetching,
    data,
    userSelectOptions,
  };
}
