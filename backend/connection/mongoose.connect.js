const mongoose = require("mongoose");

const ConnectMongoDB = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("MonogoDB Connected");
  } catch (error) {
    console.log("Mongo Connect ERROR", error);
    process.exit(1);
  }
};
module.exports = ConnectMongoDB;
