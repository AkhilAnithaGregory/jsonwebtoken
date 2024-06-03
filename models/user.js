const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  apartmentName: { type: String, required: true },
  streetName: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
  city: { type: String, required: true },
  default: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: Number, unique: true, required: true },
  dateOfBirth: { type: Number, required: true },
  password: { type: String, required: true },
  data: [{ type: mongoose.Schema.Types.ObjectId, ref: "company" }],
  shippingAddresses: [addressSchema],
});

const User = mongoose.model("User", userSchema);


module.exports = User;
