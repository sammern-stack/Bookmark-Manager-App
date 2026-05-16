const User = require("../models/user.model");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(`Error occurred while fetching users: ${error}`);
    res.status(500).json({ error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id))
      return res.status(400).json({ message: "invalid user ID" });

    const find = await User.findById(id);
    if (!find) return res.status(404).json({ message: "user not found" });

    res.status(200).json(find);
  } catch (error) {
    console.log(`Error occurred while fetching user: ${error}`);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id))
      return res.status(400).json({ message: "invalid user ID" });

    const find = await User.findById(id);
    if (!find) return res.status(404).json({ message: "user not found" });

    await User.findByIdAndDelete(id);
    const users = await User.find();

    res.status(200).json({ message: "User deleted", users });
  } catch (error) {
    console.log(`Error occurred while deleting user: ${error}`);
    res.status(500).json({ error });
  }
};

// Utility: Validate id
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
