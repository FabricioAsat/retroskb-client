import { ENDPOINTS } from "../constants/endpoints";

import type {
  IManga,
  IMangaCreate,
  IMangaUpdate,
  IResponse,
  MangaState,
  UseFetchCall,
} from "../models";

import { loadAbort } from "../utils";
import { axiosInstance } from "./axiosInstance";

interface GetMangasProps {
  state?: MangaState;
  search?: string;
}

export const getMangas = ({
  state,
  search,
}: GetMangasProps): UseFetchCall<IResponse<IManga[]>> => {
  const controller = loadAbort();

  console.log(`%c get mangas by: ${state}`, "color: #4da3ff");
  console.log(state);

  const params: Record<string, string> = {};
  if (state) params.state = state;
  if (search) params.search = search;

  return {
    call: axiosInstance.get<IResponse<IManga[]>>(ENDPOINTS.MANGAS.BASE, {
      signal: controller.signal,
      params: Object.keys(params).length ? params : undefined,
    }),
    controller,
  };
};

export const createManga = (
  body: IMangaCreate
): UseFetchCall<IResponse<IManga>> => {
  const controller = loadAbort();
  return {
    call: axiosInstance.post<IResponse<IManga>>(ENDPOINTS.MANGAS.BASE, body, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getManga = (id: string): UseFetchCall<IResponse<IManga>> => {
  const controller = loadAbort();
  return {
    call: axiosInstance.get<IResponse<IManga>>(ENDPOINTS.MANGAS.BY_ID(id), {
      signal: controller.signal,
    }),
    controller,
  };
};

export const updateManga = ({
  body,
  id,
}: {
  body: IMangaUpdate;
  id: string;
}): UseFetchCall<IResponse<IManga>> => {
  const controller = loadAbort();
  return {
    call: axiosInstance.put<IResponse<IManga>>(
      ENDPOINTS.MANGAS.BY_ID(id),
      body,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const deleteManga = (id: string): UseFetchCall<IResponse<string>> => {
  const controller = loadAbort();
  return {
    call: axiosInstance.delete<IResponse<string>>(ENDPOINTS.MANGAS.BY_ID(id), {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteMangas = (): UseFetchCall<IResponse<string>> => {
  const controller = loadAbort();
  return {
    call: axiosInstance.delete<IResponse<string>>(ENDPOINTS.MANGAS.BASE, {
      signal: controller.signal,
    }),
    controller,
  };
};
