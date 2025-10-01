export interface IResponse<T> {
  message?: string;
  error?: string;
  data: T;
}
