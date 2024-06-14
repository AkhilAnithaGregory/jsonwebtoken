const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      "mongodb+srv://akhil_gregory:GZr1fQji9kKMjPB1@cluster0.04qsqmr.mongodb.net/ECCOMERCE";

    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
