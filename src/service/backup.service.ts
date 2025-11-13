import { ENDPOINTS } from "../constants/endpoints";
import type { IResponse, UseFetchCall } from "../models";
import { loadAbort } from "../utils";
import { axiosInstance } from "./axiosInstance";

export const getBackup = (): UseFetchCall<Blob> => {
  const controller = loadAbort();
  return {
    call: axiosInstance.get<Blob>(ENDPOINTS.BACKUP.EXPORT, {
      signal: controller.signal,
      responseType: "blob", // Esto por que el backend devuelve binarios
    }),
    controller,
  };
};

export const importBackup = (file: File): UseFetchCall<IResponse<string>> => {
  const controller = loadAbort();
  const formData = new FormData();
  formData.append("file", file);
  return {
    call: axiosInstance.post<IResponse<string>>(
      ENDPOINTS.BACKUP.IMPORT,
      formData,
      {
        signal: controller.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
    controller,
  };
};
