const express = require("express");
const router = express.Router();

const {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} = require("../controllers/bookmark.controller");

const { authJWT } = require("../middleware/auth.middleware");

router.route("/").get(getBookmarks).post(authJWT, createBookmark);

router
  .route("/:id")
  .get(authJWT, getBookmarkById)
  .put(authJWT, updateBookmark)
  .delete(authJWT, deleteBookmark);

module.exports = router;
