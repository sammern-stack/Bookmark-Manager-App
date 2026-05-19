const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.route("/").get(getUsers);

router.route("/email/:email").get(findUserByEmail);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
