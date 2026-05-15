const express = require("express");
const router = express.Router();

const {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} = require("../controllers/bookmark.controller");

router.get("/", getBookmarks);
router.get("/:id", getBookmarkById);

router.post("/", createBookmark);

router.put("/:id", updateBookmark);

router.delete("/:id", deleteBookmark);

module.exports = router;
