const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(MONGO_URI);

    console.log(
      ` MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`
    );
  } catch (error) {
    console.error(` MongoDB connection failed: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDB;
