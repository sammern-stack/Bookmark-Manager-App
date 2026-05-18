import { apiCall } from "./utils";
import type { User, NewUser } from "../types"

export const signupUser = async (data: NewUser) =>
  await apiCall<NewUser>("POST", "/auth/signup", data, false);

export const loginUser = async (data: User) =>
  await apiCall<User>("POST", "/auth/login", data, false);

export const logoutUser = async () =>
  await apiCall("GET", "/auth/logout", null, false);
