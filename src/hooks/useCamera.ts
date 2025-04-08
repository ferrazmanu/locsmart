import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import {
  ICamera,
  IGetAllCamerasResponse,
} from "../interfaces/camera.interface";
import { IError } from "../interfaces/error.interface";
import { ISearch } from "../interfaces/search.interface";
import {
  deleteCameraById,
  getAllCameras,
  getCameraById,
  postCamera,
  putCamera,
} from "../services/api/endpoints/camera";

export function useCamera(filters?: ISearch) {
  const { updateModalState } = useModalContext();
  const {
    dashboardState: { loggedUser },
    showToast,
  } = useDashboardContext();

  const handleCloseModal = () => {
    updateModalState("isOpen", null);
  };

  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllCameras = async (filters?: ISearch) => {
    try {
      const res = await getAllCameras(filters);

      if (successResponse.includes(res.status)) {
        return res.data as IGetAllCamerasResponse;
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

  const fetchCameraById = async (id: number) => {
    try {
      const res = await getCameraById(id);

      if (successResponse.includes(res.status)) {
        return res.data as ICamera;
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

  const updateCamera = async (dataEdit: ICamera) => {
    try {
      const res = await putCamera(dataEdit);

      if (successResponse.includes(res.status)) {
        handleCloseModal();

        showToast("Câmera editada com sucesso!", "success");
        return res.data as ICamera;
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

  const postNewCamera = async (dataEdit: ICamera) => {
    try {
      const res = await postCamera(dataEdit);

      if (successResponse.includes(res.status)) {
        handleCloseModal();

        showToast("Câmera salva com sucesso!", "success");
        return res.data as ICamera;
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

  const deleteCamera = async (id: number) => {
    try {
      const res = await deleteCameraById(id);

      if (successResponse.includes(res.status)) {
        handleCloseModal();

        showToast("Câmera removida com sucesso!", "success");
        return res.data as ICamera;
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
    queryKey: [queryKey.CAMERA_LIST, filters],
    queryFn: () => fetchAllCameras(filters),
    enabled: !!loggedUser,
    refetchOnMount: false,
  });

  const createOrUpdateCamera = async (data: ICamera) => {
    if (data.id) return await updateCamera(data);
    return await postNewCamera(data);
  };

  const cameraSelectOptions = useMemo(() => {
    const list: TSelectOptions[] =
      data?.itens.map((item) => ({
        value: item.id,
        name: item.nome,
      })) || [];

    return list;
  }, [data]);

  return {
    deleteCamera,
    fetchAllCameras,
    postNewCamera,
    updateCamera,
    fetchCameraById,
    refetch,
    isLoading,
    isRefetching,
    data,
    cameraSelectOptions,
    createOrUpdateCamera,
  };
}
