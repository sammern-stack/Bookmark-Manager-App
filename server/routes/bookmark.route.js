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

router.get("/", getBookmarks);
router.get("/:id", authJWT, getBookmarkById);

router.post("/", createBookmark);

router.put("/:id", updateBookmark);

router.delete("/:id", deleteBookmark);

module.exports = router;
