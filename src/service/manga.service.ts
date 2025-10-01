import axios from "axios";

import type { UseFetchCall } from "../models";
import { loadAbort } from "../utils";

export const getMangas = (): UseFetchCall<any> => {
  const controller = loadAbort();
  return {
    call: axios.get<any>(
      `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_GROUP_MANGAS}/`,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
