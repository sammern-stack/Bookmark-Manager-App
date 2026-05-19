import { apiCall } from "./utils";
import type { UpdateUser } from "../types";

export const findUserByEmail = async (email: string) =>
  await apiCall<UpdateUser>("GET", `/user/email/${email}`, null, false);

export const updateUser = async (id: string, updates: UpdateUser) =>
  await apiCall<UpdateUser>("PUT", `/user/${id}`, updates, false);
