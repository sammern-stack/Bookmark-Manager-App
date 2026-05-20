import { create } from "zustand";
import { getBookmarks } from "../../../api/bookmark";
import type { Bookmark } from "../../../types";

interface BookmarkStore {
  bookmarks: Bookmark[];
  tags: string[];
  setBookmarks: () => Promise<void>;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  tags: [],

  setBookmarks: async () => {
    const res = await getBookmarks();

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    const bookmarks = res.data;
    const tags = [...new Set(bookmarks.flatMap((b) => b.tags ?? []))];

    set({ bookmarks, tags });
  },
}));
