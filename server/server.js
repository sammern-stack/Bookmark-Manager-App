const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authJWT } = require("./middleware/auth.middleware");

// Environmental Variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(require("./config/corsOptions")));
app.use(cookieParser());

// Routes
app.use("/auth", require("./routes/auth.route"));
app.use("/user", require("./routes/user.route"));

// Routes require authentication
app.use(authJWT);
app.use("/bookmark", require("./routes/bookmark.route"));

// Connect to MongoDB and initialize the server
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Mongodb has connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error occurred while connecting to MongoDB: ${error}`);
  });
