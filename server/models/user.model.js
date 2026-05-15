const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username cant be empty"],
    },
    email: {
      type: String,
      required: [true, "Email cant be empty"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: [true, "Password cant be empty"],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserModel);

module.exports = User;
