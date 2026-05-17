const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  logoutUser,
  refreshJWT,
} = require("../controllers/auth.controller");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/refresh", refreshJWT);

module.exports = router;
