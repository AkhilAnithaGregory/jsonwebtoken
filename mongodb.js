const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://akhil_gregory:GZr1fQji9kKMjPB1@cluster0.04qsqmr.mongodb.net/test";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the application on connection failure
  }
};

module.exports = connectDB;
