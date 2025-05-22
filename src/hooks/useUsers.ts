import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import { IError } from "../interfaces/error.interface";
import { ISearch } from "../interfaces/search.interface";
import {
  IGetAllUsersResponse,
  IUser,
  IUserPassword,
} from "../interfaces/user.interface";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  putUserPassword,
} from "../services/api/endpoints/user";
import { usePermission } from "./usePermission";
import { useRedirect } from "./useRedirect";

export function useUser(filters?: ISearch) {
  const { closeModal } = useModalContext();
  const {
    dashboardState: { loggedUser },
    showToast,
  } = useDashboardContext();
  const { hasPermission } = usePermission();

  const { redirectTo } = useRedirect();

  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllUsers = async (filters?: ISearch) => {
    try {
      const res = await getAllUsers(filters);

      if (successResponse.includes(res.status)) {
        return res.data as IGetAllUsersResponse;
      } else {
        return;
      }
    } catch (error) {
      if (isAxiosError<IError>(error)) {
        if (error?.response?.data?.message) {
          return showToast(error?.response?.data?.message, "error");
        } else {
          return showToast(error?.message, "error");
        }
      }
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
      if (isAxiosError<IError>(error)) {
        if (error?.response?.data?.message) {
          return showToast(error?.response?.data?.message, "error");
        } else {
          return showToast(error?.message, "error");
        }
      }
    }
  };

  const updateUser = async (dataEdit: IUser) => {
    try {
      const res = await putUser(dataEdit);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Usuário editado com sucesso!", "success");
        return res.data as IUser;
      } else {
        return null;
      }
    } catch (error) {
      if (isAxiosError<IError>(error)) {
        if (error?.response?.data?.message) {
          return showToast(error?.response?.data?.message, "error");
        } else {
          return showToast(error?.message, "error");
        }
      }
    }
  };

  const postNewUser = async (dataEdit: IUser) => {
    try {
      const res = await postUser(dataEdit);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Usuário criado com sucesso!", "success");
        return res.data as IUser;
      } else {
        return null;
      }
    } catch (error) {
      if (isAxiosError<IError>(error)) {
        if (error?.response?.data?.message) {
          return showToast(error?.response?.data?.message, "error");
        } else {
          return showToast(error?.message, "error");
        }
      }
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const res = await deleteUserById(id);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Usuário removido com sucesso!", "success");
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      if (isAxiosError<IError>(error)) {
        if (error?.response?.data?.message) {
          return showToast(error?.response?.data?.message, "error");
        } else {
          return showToast(error?.message, "error");
        }
      }
    }
  };

  const updateUserPassword = async (dataEdit: IUserPassword) => {
    try {
      const res = await putUserPassword(dataEdit);

      if (successResponse.includes(res.status)) {
        redirectTo(`${process.env.NEXT_PUBLIC_HOME_REDIRECT}`);
        return res.data as IUser;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const { refetch, isLoading, isRefetching, data } = useQuery({
    queryKey: [queryKey.USER_LIST, filters],
    queryFn: () => fetchAllUsers(filters),
    enabled: !!loggedUser && hasPermission,
    refetchOnMount: false,
  });

  const createOrUpdateUser = async (data: IUser) => {
    if (data.id) return await updateUser(data);
    return await postNewUser(data);
  };

  const userSelectOptions = useMemo(() => {
    const list: TSelectOptions[] =
      data?.itens.map((item) => ({
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
    createOrUpdateUser,
  };
}
