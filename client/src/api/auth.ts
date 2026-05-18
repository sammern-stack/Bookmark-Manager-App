import { apiCall } from "./utils";

type User = {
  email: string;
  password: string;
};

type NewUser = {
  username: string;
  email: string;
  password: string;
};

export const signupUser = async (data: NewUser) =>
  await apiCall<NewUser>("POST", "/auth/signup", data, false);

export const loginUser = async (data: User) =>
  await apiCall<User>("POST", "/auth/login", data, false);

export const logoutUser = async () =>
  await apiCall("GET", "/auth/logout", null, false);
