import { create } from "zustand";
import { getBookmarks } from "../../../api/bookmark";
import type { Bookmark } from "../../../types";

interface BookmarkStore {
  bookmarks: Bookmark[];
  tags: Map<string, number>;
  setBookmarks: () => Promise<void>;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  tags: new Map(),

  setBookmarks: async () => {
    const res = await getBookmarks();

    if (!res.ok) {
      console.log(res.error);
      return;
    }

    const bookmarks = res.data;
    const tags = bookmarks
      .flatMap((b) => b.tags ?? [])
      .reduce((acc, tag) => {
        acc.set(tag, (acc.get(tag) ?? 0) + 1);
        return acc;
      }, new Map<string, number>());

    set({ bookmarks, tags });
  },
}));
