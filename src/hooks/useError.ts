import { isAxiosError } from "axios";
import { useState } from "react";
import { IError } from "../interfaces/error.interface";

export const useError = () => {
  const [errorResponse, setErrorResponse] = useState<IError>();

  const handleError = (error: Error) => {
    if (isAxiosError<IError>(error)) {
      setErrorResponse({
        status: error?.status,
        code: error?.code,
        message: error?.message,
        stackTrace: error?.stack,
        title: error?.name,
        error: error?.message,
      });
    }
  };

  return { errorResponse, handleError };
};
