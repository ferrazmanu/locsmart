import { useQuery } from "@tanstack/react-query";
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

  const fetchAllCameras = async () => {
    try {
      const { data } = await getAllCameras();

      return data as ICamera[];
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const fetchCameraById = async (id: number) => {
    try {
      const { data } = await getCameraById(id);

      return data as ICamera;
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const updateCamera = async (dataEdit: ICamera) => {
    try {
      const { data } = await putCamera(dataEdit);
      updateModalEdit("isOpen", false);

      return data as ICamera;
    } catch (err) {
      return false;
    }
  };

  const postNewCamera = async (dataEdit: ICamera) => {
    try {
      const { data } = await postCamera(dataEdit);
      updateModalEdit("isOpen", false);

      return data as ICamera;
    } catch (err) {
      return false;
    }
  };

  const deleteCamera = async (id: number) => {
    try {
      const { data } = await deleteCameraById(id);
      updateModalDelete("isOpen", false);

      return data;
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
  };
}
