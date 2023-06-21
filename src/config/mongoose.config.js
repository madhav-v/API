const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    autoCreate: true,
    autoIndex: true,
  })
  .then((conn) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error connecting database");
  });
