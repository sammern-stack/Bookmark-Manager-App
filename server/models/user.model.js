const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      required: [true, "Password cant be empty"],
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Mongoose Middleware before an action happened
UserModel.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// Static method to login users
UserModel.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect Email");

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw Error("Incorrect Password");

  return user;
};

const User = mongoose.model("user", UserModel);

module.exports = User;
