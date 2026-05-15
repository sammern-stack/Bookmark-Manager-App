const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:id", getUserById);

router.delete("/:id", deleteUser);

module.exports = router;
