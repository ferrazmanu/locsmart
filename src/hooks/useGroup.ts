import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import { IError } from "../interfaces/error.interface";
import { IGetAllGroupsResponse, IGroup } from "../interfaces/group.interface";
import { ISearch } from "../interfaces/search.interface";
import {
  deleteGroupById,
  getAllGroups,
  getGroupById,
  postGroup,
  putGroup,
} from "../services/api/endpoints/group";
import { usePermission } from "./usePermission";

export function useGroup(filters?: ISearch) {
  const { closeModal } = useModalContext();
  const {
    dashboardState: { loggedUser },
    showToast,
  } = useDashboardContext();
  const { hasPermission } = usePermission();

  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllGroups = async (filters?: ISearch) => {
    try {
      const res = await getAllGroups(filters);

      if (successResponse.includes(res.status)) {
        return res.data as IGetAllGroupsResponse;
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

  const fetchGroupById = async (id: number) => {
    try {
      const res = await getGroupById(id);

      if (successResponse.includes(res.status)) {
        return res.data as IGroup;
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

  const updateGroup = async (dataEdit: IGroup) => {
    try {
      const res = await putGroup(dataEdit);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Grupo editado com sucesso!", "success");
        return res.data as IGroup;
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

  const postNewGroup = async (dataEdit: IGroup) => {
    try {
      const res = await postGroup(dataEdit);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Grupo criado com sucesso!", "success");
        return res.data as IGroup;
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

  const deleteGroup = async (id: number) => {
    try {
      const res = await deleteGroupById(id);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Grupo removido com sucesso!", "success");
        return res.data as IGroup;
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

  const { refetch, isLoading, isRefetching, data } = useQuery({
    queryKey: [queryKey.GROUP_LIST, filters],
    queryFn: () => fetchAllGroups(filters),
    enabled: !!loggedUser && hasPermission,
    refetchOnMount: false,
  });

  const createOrUpdateGroup = async (data: IGroup) => {
    if (data.id) return await updateGroup(data);
    return await postNewGroup(data);
  };

  const groupSelectOptions = useMemo(() => {
    const list: TSelectOptions[] =
      data?.itens.map((item) => ({
        value: item.id,
        name: item.nome,
      })) || [];

    return list;
  }, [data]);

  return {
    deleteGroup,
    fetchAllGroups,
    postNewGroup,
    updateGroup,
    fetchGroupById,
    refetch,
    isLoading,
    isRefetching,
    data,
    groupSelectOptions,
    createOrUpdateGroup,
  };
}
