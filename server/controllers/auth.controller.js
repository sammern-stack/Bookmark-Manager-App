const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET;
const MAX_AGE = 3 * 24 * 60 * 60; // 3 days in seconds

const signupUser = async (req, res) => {
  try {
    const { user } = req.body;

    const newUser = await User.create({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    const token = createJWT(newUser._id);

    res.cookie("jwt", token, { maxAge: MAX_AGE * 1000, httpOnly: true });
    res
      .status(201)
      .json({ message: "User signup successfully", user: newUser._id });
  } catch (error) {
    console.log(`Error occurred while user tried to sign up: ${error}`);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { info } = req.body;

    const user = await User.login(info.email, info.password);

    const token = createJWT(user._id);
    res.cookie("jwt", token, { maxAge: MAX_AGE * 1000, httpOnly: true });

    res.status(200).json({ user: user._id });
  } catch (error) {
    console.log(`Error occurred while user tried to log in: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("http://localhost:3001/bookmark")
};

// Utility
function createJWT(id) {
  const payload = { id };
  const secret = JWT_SECRET;
  const options = { expiresIn: MAX_AGE };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};
