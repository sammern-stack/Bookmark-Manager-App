const express = require("express");
const router = express.Router();

const {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} = require("../controllers/bookmark.controller");

router.route("/").get(getBookmarks).post(createBookmark);

router
  .route("/:id")
  .get(getBookmarkById)
  .put(updateBookmark)
  .delete(deleteBookmark);

module.exports = router;
