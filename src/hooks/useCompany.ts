import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import {
  ICompany,
  IGetAllCompaniesResponse,
} from "../interfaces/company.interface";
import { ISearch } from "../interfaces/search.interface";
import {
  deleteCompanyById,
  getAllCompanies,
  getCompanyById,
  postCompany,
  putCompany,
  putCompanyPayment,
} from "../services/api/endpoints/company";

export function useCompany(filters?: ISearch) {
  const { updateModalState } = useModalContext();
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();

  const handleCloseModal = () => {
    updateModalState("isOpen", null);
  };

  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllCompanies = async (filters?: ISearch) => {
    try {
      const res = await getAllCompanies(filters);

      if (successResponse.includes(res.status)) {
        return res.data as IGetAllCompaniesResponse;
      } else {
        return;
      }
    } catch (error) {
      console.error("error: ", error);
      return;
    }
  };

  const fetchCompanyById = async (id: number) => {
    try {
      const res = await getCompanyById(id);

      if (successResponse.includes(res.status)) {
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

      if (successResponse.includes(res.status)) {
        handleCloseModal();
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

      if (successResponse.includes(res.status)) {
        handleCloseModal();
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

      if (successResponse.includes(res.status)) {
        handleCloseModal();
        return res.data as ICompany;
      } else {
        return null;
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const updateCompanyPayment = async (id: number) => {
    try {
      const res = await putCompanyPayment(id);

      if (successResponse.includes(res.status)) {
        handleCloseModal();
        return res.data as ICompany;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const { refetch, isLoading, isRefetching, data } = useQuery({
    queryKey: [queryKey.COMPANY_LIST, filters],
    queryFn: () => fetchAllCompanies(filters),
    enabled: !!loggedUser,
    refetchOnMount: false,
  });

  const createOrUpdateCamera = async (data: ICompany) => {
    if (data.id) return await updateCompany(data);
    return await postCompany(data);
  };

  const companySelectOptions = useMemo(() => {
    const list: TSelectOptions[] =
      data?.itens.map((item) => ({
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
    updateCompanyPayment,
    isLoading,
    isRefetching,
    data,
    companySelectOptions,
    createOrUpdateCamera,
  };
}
