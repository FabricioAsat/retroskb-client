import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints";
import type {
  IResponse,
  IUser,
  IUserLogin,
  IUserRegister,
  UseFetchCall,
} from "../models";
import { loadAbort } from "../utils";

export const registerUser = (
  body: IUserRegister
): UseFetchCall<IResponse<IUser>> => {
  const controller = loadAbort();
  return {
    call: axios.post<IResponse<IUser>>(ENDPOINTS.AUTH.REGISTER, body, {
      signal: controller.signal,
    }),
    controller,
  };
};

// --------- Login
interface IDataResponse {
  token: string;
}
export const loginUser = (
  body: IUserLogin
): UseFetchCall<IResponse<IDataResponse>> => {
  const controller = loadAbort();
  return {
    call: axios.post<IResponse<IDataResponse>>(ENDPOINTS.AUTH.LOGIN, body, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    controller,
  };
};
