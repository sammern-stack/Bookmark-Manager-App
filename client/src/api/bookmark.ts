import { apiCall } from "./utils";

type Bookmark = {
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: Array<string>;
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
};

export const getBookmarks = async () =>
  await apiCall("GET", "/bookmark", null, false);

export const getBookmarkById = async (id: string) =>
  await apiCall("GET", `/bookmark/${id}`, null, true);

export const createBookmark = async (bookmark: Bookmark) =>
  await apiCall<Bookmark>("POST", "/bookmark", bookmark, true);

export const updateBookmark = async (id: string, updates: Partial<Bookmark>) =>
  await apiCall<Bookmark>("POST", `/bookmark/${id}`, updates, true);

export const deleteBookmark = async (id: string) =>
  await apiCall<Bookmark>("POST", `/bookmark/${id}`, null, true);
