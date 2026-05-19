import { apiCall } from "./utils";
import type { User, NewUser, ResponseUser, JWTrefresh } from "../types";

export const signupUser = async (data: NewUser) =>
  await apiCall<ResponseUser>("POST", "/auth/signup", data, false);

export const loginUser = async (data: User) =>
  await apiCall<ResponseUser>("POST", "/auth/login", data, false);

export const logoutUser = async () =>
  await apiCall("GET", "/auth/logout", null, false);

export const refreshJWT = async () =>
  await apiCall<JWTrefresh>("POST", "/auth/refresh", null, false);
