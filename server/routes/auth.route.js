const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
