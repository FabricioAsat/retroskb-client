import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints";

import type {
  IManga,
  IMangaCreate,
  IMangaUpdate,
  IResponse,
  UseFetchCall,
} from "../models";

import { loadAbort } from "../utils";

export const getMangas = (): UseFetchCall<IResponse<IManga[]>> => {
  const controller = loadAbort();
  return {
    call: axios.get<IResponse<IManga[]>>(ENDPOINTS.MANGAS.BASE, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getManga = (id: string): UseFetchCall<IResponse<IManga>> => {
  const controller = loadAbort();
  return {
    call: axios.get<IResponse<IManga>>(ENDPOINTS.MANGAS.BY_ID(id), {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createManga = (
  body: IMangaCreate
): UseFetchCall<IResponse<IManga>> => {
  const controller = loadAbort();
  return {
    call: axios.post<IResponse<IManga>>(ENDPOINTS.MANGAS.BASE, body, {
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
    call: axios.put<IResponse<IManga>>(ENDPOINTS.MANGAS.BY_ID(id), body, {
      signal: controller.signal,
    }),
    controller,
  };
};
