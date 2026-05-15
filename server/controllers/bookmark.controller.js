const mongoose = require("mongoose");
const Bookmark = require("../models/bookmark.model");

const getBookmarks = async (req, res) => {
  try {
    const data = await Bookmark.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error occurred while fetching bookmarks: ${error}`);
    res.status(500).json({ error });
  }
};

const getBookmarkById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id))
      return res.status(400).json({ message: "invalid bookmark ID" });

    const find = await Bookmark.findById(id);
    if (!find) return res.status(404).json({ message: "bookmark not found" });

    res.status(200).json(find);
  } catch (error) {
    console.log(`Error occurred while fetching bookmark`);
    res.status(500).json({ error });
  }
};

const createBookmark = async (req, res) => {
  try {
    const { bookmark } = req.body;

    const newBookmark = await Bookmark.create(bookmark);

    res
      .status(201)
      .json({ message: "Bookmark created", bookmark: newBookmark });
  } catch (error) {
    console.log(`Error occurred while creating a new bookmark: ${error}`);
    res.status(500).json({ error });
  }
};

const updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookmark } = req.body;

    if (!isValidId(id))
      return res.status(400).json({ message: "invalid bookmark ID" });

    const find = await Bookmark.findById(id);
    if (!find) return res.status(404).json({ message: "bookmark not found" });

    const updated = await Bookmark.findByIdAndUpdate(id, bookmark, {
      new: true, // returns the updated document
      runValidators: true, // runs schema validations
    });

    res.status(200).json({ message: "Bookmark updated", bookmark: updated });
  } catch (error) {
    console.log(`Error occurred while updating a new bookmark: ${error}`);
    res.status(500).json({ error });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id))
      return res.status(400).json({ message: "invalid bookmark ID" });

    const find = await Bookmark.findById(id);
    if (!find) return res.status(404).json({ message: "bookmark not found" });

    await Bookmark.findByIdAndDelete(id);
    const bookmarks = await Bookmark.find();

    res.status(200).json({ message: "Bookmark deleted", bookmarks });
  } catch (error) {
    console.log(`Error occurred while deleting a bookmark: ${error}`);
    res.status(500).json({ error });
  }
};

// Utility: Validate id
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
