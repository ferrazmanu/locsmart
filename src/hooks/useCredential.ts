import { isAxiosError } from "axios";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { useModalContext } from "../contexts/modal/modal.context";
import {
  ICredential,
  IGetAllCredentialsResponse,
} from "../interfaces/credential.interface";
import { IError } from "../interfaces/error.interface";
import { ISearch } from "../interfaces/search.interface";
import {
  deleteCredentialById,
  getAllCredentials,
  getCredentialById,
  postCredential,
  postCredentialCode,
  putCredential,
} from "../services/api/endpoints/credential";

export function useCredential() {
  const { closeModal } = useModalContext();
  const { showToast } = useDashboardContext();

  const successResponse = [200, 201, 202, 203, 204];

  const fetchAllCredentials = async (filters?: ISearch) => {
    try {
      const res = await getAllCredentials(filters);

      if (successResponse.includes(res.status)) {
        return res.data as IGetAllCredentialsResponse;
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

  const fetchCredentialById = async (id: number) => {
    try {
      const res = await getCredentialById(id);

      if (successResponse.includes(res.status)) {
        return res.data as ICredential;
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

  const updateCredential = async (dataEdit: ICredential) => {
    try {
      const res = await putCredential(dataEdit);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Credencial editada com sucesso!", "success");
        return res.data as ICredential;
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

  const postNewCredential = async (dataEdit: ICredential) => {
    try {
      const res = await postCredential(dataEdit);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Credencial salva com sucesso!", "success");
        return res.data as ICredential;
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

  const postNewCredentialCode = async (code: string) => {
    try {
      const res = await postCredentialCode(code);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Credencial salva com sucesso!", "success");
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

  const deleteCredential = async (id: number) => {
    try {
      const res = await deleteCredentialById(id);

      if (successResponse.includes(res.status)) {
        closeModal();

        showToast("Credencial removida com sucesso!", "success");
        return res.data as ICredential;
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

  const createOrUpdateCredential = async (data: ICredential) => {
    if (data.id) return await updateCredential(data);
    return await postNewCredential(data);
  };

  return {
    deleteCredential,
    fetchAllCredentials,
    postNewCredential,
    updateCredential,
    fetchCredentialById,
    postNewCredentialCode,
    createOrUpdateCredential,
  };
}
