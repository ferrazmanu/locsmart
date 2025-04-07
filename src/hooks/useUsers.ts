import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import { IUser, IUserPassword } from "../interfaces/user";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  putUserPassword,
} from "../services/api/endpoints/user";
import { useRedirect } from "./useRedirect";

export function useUser() {
  const { updateModalEdit, updateModalDelete } = useModalContext();
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();

  const { redirectTo } = useRedirect();

  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers();

      if (successResponse.includes(res.status)) {
        return res.data as IUser[];
      } else {
        return [];
      }
    } catch (error) {
      console.error("error: ", error);
      return [];
    }
  };

  const fetchUserById = async (id: number) => {
    try {
      const res = await getUserById(id);

      if (successResponse.includes(res.status)) {
        return res.data as IUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const updateUser = async (dataEdit: IUser) => {
    try {
      const res = await putUser(dataEdit);

      if (successResponse.includes(res.status)) {
        updateModalEdit("isOpen", false);
        return res.data as IUser;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const postNewUser = async (dataEdit: IUser) => {
    try {
      const res = await postUser(dataEdit);

      if (successResponse.includes(res.status)) {
        updateModalEdit("isOpen", false);
        return res.data as IUser;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const res = await deleteUserById(id);

      if (successResponse.includes(res.status)) {
        updateModalDelete("isOpen", false);
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const updateUserPassword = async (dataEdit: IUserPassword) => {
    try {
      const res = await putUserPassword(dataEdit);

      if (successResponse.includes(res.status)) {
        redirectTo("/dashboard");
        return res.data as IUser;
      } else {
        return null;
      }
    } catch (err) {
      return false;
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
    updateUserPassword,
    isLoading,
    isRefetching,
    data,
    userSelectOptions,
  };
}
