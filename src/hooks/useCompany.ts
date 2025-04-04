import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import { ICompany } from "../interfaces/company";
import {
  deleteCompanyById,
  getAllCompanies,
  getCompanyById,
  postCompany,
  putCompany,
} from "../services/api/endpoints/company";

export function useCompany() {
  const { updateModalEdit, updateModalDelete } = useModalContext();
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();

  const fetchAllCompanies = async () => {
    try {
      const { data } = await getAllCompanies();

      return data as ICompany[];
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const fetchCompanyById = async (id: number) => {
    try {
      const { data } = await getCompanyById(id);

      return data as ICompany;
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const updateCompany = async (dataEdit: ICompany) => {
    try {
      const { data } = await putCompany(dataEdit);
      updateModalEdit("isOpen", false);

      return data as ICompany;
    } catch (err) {
      return false;
    }
  };

  const postNewCompany = async (dataEdit: ICompany) => {
    try {
      const { data } = await postCompany(dataEdit);
      updateModalEdit("isOpen", false);

      return data as ICompany;
    } catch (err) {
      return false;
    }
  };

  const deleteCompany = async (id: number) => {
    try {
      const { data } = await deleteCompanyById(id);
      updateModalDelete("isOpen", false);

      return data;
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const { refetch, isLoading, isRefetching, data } = useQuery({
    queryKey: [queryKey.COMPANIES],
    queryFn: () => fetchAllCompanies(),
    enabled: !!loggedUser,
    refetchOnMount: false,
  });

  const companySelectOptions = useMemo(() => {
    const list: TSelectOptions[] =
      data?.map((item) => ({
        value: item.id,
        name: item.razaoSocial,
      })) || [];

    return list;
  }, [data]);

  return {
    deleteCompany,
    fetchAllCompanies,
    postNewCompany,
    updateCompany,
    fetchCompanyById,
    refetch,
    isLoading,
    isRefetching,
    data,
    companySelectOptions,
  };
}
