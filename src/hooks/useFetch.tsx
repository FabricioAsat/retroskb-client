import { useCallback, useEffect, useState } from "react";
import type { UseFetchCall } from "../models";

type UseFetchOptions<P> = {
  autoFetch?: boolean;
  params: P;
};

type Data<T> = T | null;
type CustomError = Error | null;

interface UseFetchResult<T, P> {
  loading: boolean;
  data: Data<T>;
  error: CustomError;
  fetch: (param: P) => void;
}
//* Uso: const { loading, error, data, fetch } = useApi<Character, number>(getCharacter, { autoFetch: true, params: 1 })
export const useFetch = <T, P>(
  fetchCall: (param: P) => UseFetchCall<T>,
  options?: UseFetchOptions<P>
): UseFetchResult<T, P> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<CustomError>(null);

  const fetch = useCallback(
    (param: P) => {
      const { call, controller } = fetchCall(param);
      setLoading(true);

      call
        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
      return () => controller.abort();
    },
    [fetchCall]
  );

  useEffect(() => {
    if (options?.autoFetch) {
      return fetch(options.params);
    }
  }, [fetch, options?.autoFetch, options?.params]);

  return { loading, data, error, fetch };
};
