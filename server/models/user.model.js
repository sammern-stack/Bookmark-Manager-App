const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserModel);

module.exports = User;
