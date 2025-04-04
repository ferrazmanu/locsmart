import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import { IGroup } from "../interfaces/group";
import {
  deleteGroupById,
  getAllGroups,
  getGroupById,
  postGroup,
  putGroup,
} from "../services/api/endpoints/group";

export function useGroup() {
  const { updateModalEdit, updateModalDelete } = useModalContext();
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();

  const fetchAllGroups = async () => {
    try {
      const { data } = await getAllGroups();

      return data as IGroup[];
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const fetchGroupById = async (id: number) => {
    try {
      const { data } = await getGroupById(id);

      return data as IGroup;
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const updateGroup = async (dataEdit: IGroup) => {
    try {
      const { data } = await putGroup(dataEdit);
      updateModalEdit("isOpen", false);

      return data as IGroup;
    } catch (err) {
      return false;
    }
  };

  const postNewGroup = async (dataEdit: IGroup) => {
    try {
      const { data } = await postGroup(dataEdit);
      updateModalEdit("isOpen", false);

      return data as IGroup;
    } catch (err) {
      return false;
    }
  };

  const deleteGroup = async (id: number) => {
    try {
      const { data } = await deleteGroupById(id);
      updateModalDelete("isOpen", false);

      return data;
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
