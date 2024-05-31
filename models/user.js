const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gender: { type: String, required: true },
  phoneNumber: { type: Number, unique: true, required: true },
  dateOfBirth: { type: Date, required: true }, // Changed to Date type
  password: {
    type: String,
    required: true,
  },
  data: [{ type: mongoose.Schema.Types.ObjectId, ref: "company" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
