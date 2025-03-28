const mongoose = require("mongoose");
require('dotenv').config()
const mongoDBConnectionString = process.env.DB_URI ;

const connectDB = () => {
  return mongoose.connect(mongoDBConnectionString);
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

module.exports = connectDB;
