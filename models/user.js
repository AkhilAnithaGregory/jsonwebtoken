const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  phoneNumber: { type: Number, unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
  data: [{ type: mongoose.Schema.Types.ObjectId, ref: "company" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
