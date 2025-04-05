import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { TSelectOptions } from "../components/select/select.interfaces";
import { queryKey } from "../constants/query-keys";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import { ICamera } from "../interfaces/camera";
import {
  deleteCameraById,
  getAllCameras,
  getCameraById,
  postCamera,
  putCamera,
} from "../services/api/endpoints/camera";

export function useCamera() {
  const { updateModalEdit, updateModalDelete } = useModalContext();
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();
  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllCameras = async () => {
    try {
      const res = await getAllCameras();

      if (successResponse.includes(res.status)) {
        return res.data as ICamera[];
      } else {
        return [];
      }
    } catch (error) {
      console.error("error: ", error);
      return [];
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
      console.error("error: ", error);
    }
  };

  const updateCamera = async (dataEdit: ICamera) => {
    try {
      const res = await putCamera(dataEdit);

      if (successResponse.includes(res.status)) {
        updateModalEdit("isOpen", false);
        return res.data as ICamera;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const postNewCamera = async (dataEdit: ICamera) => {
    try {
      const res = await postCamera(dataEdit);

      if (successResponse.includes(res.status)) {
        updateModalEdit("isOpen", false);
        return res.data as ICamera;
      } else {
        return null;
      }
    } catch (err) {
      return false;
    }
  };

  const deleteCamera = async (id: number) => {
    try {
      const res = await deleteCameraById(id);

      if (successResponse.includes(res.status)) {
        updateModalDelete("isOpen", false);
        return res.data as ICamera;
      } else {
        return null;
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const { refetch, isLoading, isRefetching, data } = useQuery({
    queryKey: [queryKey.CAMERAS],
    queryFn: () => fetchAllCameras(),
    enabled: !!loggedUser,
    refetchOnMount: false,
  });

  const cameraSelectOptions = useMemo(() => {
    const list: TSelectOptions[] =
      data?.map((item) => ({
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
  };
}
