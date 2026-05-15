const mongoose = require("mongoose");

const BookmarkModel = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Bookmark",
    },
    url: String,
    favicon: {
      type: String,
      default: "none",
    },
    description: String,
    tags: [String],
    pinned: Boolean,
    isArchived: Boolean,
    visitCount: Number,
  },
  {
    timestamps: true,
  },
);

const Bookmark = mongoose.model("bookmark", BookmarkModel);

module.exports = Bookmark
