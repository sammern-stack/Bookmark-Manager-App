const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

app.use(express.json());
app.use(cors(require("./config/cors.json")));

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
