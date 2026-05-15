const User = require("../models/user.model");

const signupUser = async (req, res) => {
  try {
    const { user } = req.body;

    const newUser = await User.create({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    res
      .status(201)
      .json({ message: "User signup successfully", user: newUser });
  } catch (error) {
    console.log(`Error occurred while user tried to sign up: ${error}`);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { info } = req.body;

    res.status(200).json(info);
  } catch (error) {
    console.log(`Error occurred while user tried to log in: ${error}`);
    res.status(500).json({ error });
  }
};

const logoutUser = async (req, res) => {};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};
