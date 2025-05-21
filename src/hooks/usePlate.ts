import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";

import { IError } from "../interfaces/error.interface";
import { IGetAllPlatesResponse, IPlate } from "../interfaces/plate.interface";
import { ISearch } from "../interfaces/search.interface";
import { getAllPlates, getPlateById } from "../services/api/endpoints/plate";

export function usePlate(filters?: ISearch, autoRefetch?: boolean) {
  const {
    dashboardState: { loggedUser },
    showToast,
  } = useDashboardContext();

  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllPlates = async (filters?: ISearch) => {
    try {
      const res = await getAllPlates(filters);

      if (successResponse.includes(res.status)) {
        return res.data as IGetAllPlatesResponse;
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

  const fetchPlateById = async (id: number) => {
    try {
      const res = await getPlateById(id);

      if (successResponse.includes(res.status)) {
        return res.data as IPlate;
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
    queryKey: [queryKey.PLATE_LIST, filters],
    queryFn: () => fetchAllPlates(filters),
    enabled: !!loggedUser,
    refetchOnMount: false,
    refetchInterval: autoRefetch ? 10000 : false,
  });

  return {
    fetchAllPlates,
    fetchPlateById,
    refetch,
    isLoading,
    isRefetching,
    data,
  };
}
