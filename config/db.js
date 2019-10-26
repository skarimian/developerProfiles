const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("DB connected");
  } catch (error) {
    console.log(`Can not connect to db because ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
