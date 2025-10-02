import axios from "axios";

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
    call: axios.get<IResponse<IManga[]>>(
      `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_GROUP_MANGAS}/`,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const getManga = (id: string): UseFetchCall<IResponse<IManga>> => {
  const controller = loadAbort();
  return {
    call: axios.get<IResponse<IManga>>(
      `${import.meta.env.VITE_BASE_URL}/${
        import.meta.env.VITE_GROUP_MANGAS
      }/${id}`,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};

export const createManga = (
  body: IMangaCreate
): UseFetchCall<IResponse<IManga>> => {
  const controller = loadAbort();
  return {
    call: axios.post<IResponse<IManga>>(
      `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_GROUP_MANGAS}/`,
      body,
      {
        signal: controller.signal,
      }
    ),
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
    call: axios.put<IResponse<IManga>>(
      `${import.meta.env.VITE_BASE_URL}/${
        import.meta.env.VITE_GROUP_MANGAS
      }/${id}`,
      body,
      { signal: controller.signal }
    ),
    controller,
  };
};
