import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import { IGroup } from "../interfaces/group.interface";
import {
  deleteGroupById,
  getAllGroups,
  getGroupById,
  postGroup,
  putGroup,
} from "../services/api/endpoints/group";

export function useGroup() {
  const { updateModalState } = useModalContext();
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();

  const handleCloseModal = () => {
    updateModalState("isOpen", null);
  };

  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllGroups = async () => {
    try {
      const res = await getAllGroups();

      if (successResponse.includes(res.status)) {
        return res.data.itens as IGroup[];
      } else {
        return [];
      }
    } catch (error) {
      console.error("error: ", error);
      return [];
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
      console.error("error: ", error);
    }
  };

  const updateGroup = async (dataEdit: IGroup) => {
    try {
      const res = await putGroup(dataEdit);

      if (successResponse.includes(res.status)) {
        handleCloseModal();
        return res.data as IGroup;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const postNewGroup = async (dataEdit: IGroup) => {
    try {
      const res = await postGroup(dataEdit);

      if (successResponse.includes(res.status)) {
        handleCloseModal();
        return res.data as IGroup;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const deleteGroup = async (id: number) => {
    try {
      const res = await deleteGroupById(id);

      if (successResponse.includes(res.status)) {
        handleCloseModal();
        return res.data as IGroup;
      } else {
        return null;
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const { refetch, isLoading, isRefetching, data } = useQuery({
    queryKey: [queryKey.GROUPS],
    queryFn: () => fetchAllGroups(),
    enabled: !!loggedUser,
    refetchOnMount: false,
  });

  const groupSelectOptions = useMemo(() => {
    const list: TSelectOptions[] =
      data?.map((item) => ({
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
  };
}
