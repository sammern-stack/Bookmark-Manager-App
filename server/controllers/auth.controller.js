const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const MAX_AGE = 1 * 24 * 60 * 60; // 1 days in seconds

// In production: { maxAge: MAX_AGE * 1000, httpOnly: false, secure: true }
const cookieOptions = { maxAge: MAX_AGE * 1000, httpOnly: true };

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({ username, email, password });

    const refreshToken = createRefreshToken(newUser._id);

    const signedUpUser = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res.cookie("jwt", refreshToken, cookieOptions);
    res
      .status(201)
      .json({ message: "User signup successfully", user: signedUpUser });
  } catch (error) {
    console.log(`Error occurred while user tried to sign up: ${error}`);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    await User.findByIdAndUpdate(user._id, { refreshToken });

    res.cookie("jwt", refreshToken, cookieOptions);

    const loggedInUser = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    res.status(200).json({ user: loggedInUser, accessToken });
  } catch (error) {
    console.log(`Error occurred while user tried to log in: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("jwt", cookieOptions);
      return res.sendStatus(403);
    }

    await User.findByIdAndUpdate(user._id, { refreshToken: "" });
    res.clearCookie("jwt", cookieOptions);
    res.sendStatus(204);
  } catch (error) {
    console.log(`Error occurred while logout the user: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

const refreshJWT = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(403);

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded) => {
      if (error || user._id.toString() !== decoded.id)
        return res.sendStatus(403);

      const accessToken = createAccessToken(decoded.id);

      const foundUser = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      res.status(200).json({ accessToken, user: foundUser });
    });
  } catch (error) {
    console.log(`Error occurred while refreshing a JWT token: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

// Utility
function createAccessToken(id) {
  const payload = { id };
  const secret = ACCESS_TOKEN_SECRET;
  const options = { expiresIn: "30s" };

  return jwt.sign(payload, secret, options);
}

function createRefreshToken(id) {
  const payload = { id };
  const secret = REFRESH_TOKEN_SECRET;
  const options = { expiresIn: "1d" };

  return jwt.sign(payload, secret, options);
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  refreshJWT,
};
