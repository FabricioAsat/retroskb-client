import type { AxiosResponse } from "axios";

export interface UseFetchCall<T> {
  call: Promise<AxiosResponse<T>>;
  controller: AbortController;
}
