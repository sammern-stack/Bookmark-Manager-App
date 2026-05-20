import { apiCall } from "./utils";
import type { Bookmark } from "../types"

export const getBookmarks = async () =>
  await apiCall<Bookmark[]>("GET", "/bookmark", null, true);

export const getBookmarkById = async (id: string) =>
  await apiCall("GET", `/bookmark/${id}`, null, true);

export const createBookmark = async (bookmark: Bookmark) =>
  await apiCall<Bookmark>("POST", "/bookmark", bookmark, true);

export const updateBookmark = async (id: string, updates: Partial<Bookmark>) =>
  await apiCall<Bookmark>("POST", `/bookmark/${id}`, updates, true);

export const deleteBookmark = async (id: string) =>
  await apiCall<Bookmark>("POST", `/bookmark/${id}`, null, true);
