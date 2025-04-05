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
      const res = await getAllCompanies();

      if (res.status === 200) {
        return res.data as ICompany[];
      } else {
        return [];
      }
    } catch (error) {
      console.error("error: ", error);
      return [];
    }
  };

  const fetchCompanyById = async (id: number) => {
    try {
      const res = await getCompanyById(id);

      if (res.status === 200) {
        return res.data as ICompany;
      } else {
        return null;
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const updateCompany = async (dataEdit: ICompany) => {
    try {
      const res = await putCompany(dataEdit);

      if (res.status === 200) {
        updateModalEdit("isOpen", false);
        return res.data as ICompany;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const postNewCompany = async (dataEdit: ICompany) => {
    try {
      const res = await postCompany(dataEdit);

      if (res.status === 200) {
        updateModalEdit("isOpen", false);
        return res.data as ICompany;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const deleteCompany = async (id: number) => {
    try {
      const res = await deleteCompanyById(id);

      if (res.status === 200) {
        updateModalDelete("isOpen", false);
        return res.data as ICompany;
      } else {
        return null;
      }
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
