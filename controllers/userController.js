const User = require("../models/user");
const companyModal = require("../models/category");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, role, password, gender } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email or phoneNumber is already exists" });
    }

    const newUser = new User({ username, email, role, phoneNumber, password, gender });
    await newUser.save();
    res.json({ status: "success", message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.companyRegister = async (req, res) => {
  try {
    const userID = req.get("ID");
    const userId = req.params.userId;
    const { companyName, Address } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingCompany = await companyModal.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({ error: "Company is already in use" });
    }
    const newCompany = new companyModal({ companyName, Address, user: userId });
    await newCompany.save();

    res.json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "failed", error: "User not found" });
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ status: "failed", error: "User not found" });
    }

    res.status(200).json({ status: "success", message: "User profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "success", users });
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addShippingAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, mobileNumber, apartmentName, streetName, landmark, pincode, city, default: isDefault } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "failed", error: "User not found" });
    }

    if (isDefault) {
      user.shippingAddresses.forEach(address => address.default = false);
    }

    user.shippingAddresses.push({ name, mobileNumber, apartmentName, streetName, landmark, pincode, city, default: isDefault });
    await user.save();

    res.status(201).json({ status: "success", message: "Shipping address added successfully", user });
  } catch (error) {
    console.error("Error adding shipping address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getShippingAddresses = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "failed", error: "User not found" });
    }

    res.status(200).json({ status: "success", shippingAddresses: user.shippingAddresses });
  } catch (error) {
    console.error("Error fetching shipping addresses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateShippingAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.addressId;
    const { name, mobileNumber, apartmentName, streetName, landmark, pincode, city, default: isDefault } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "failed", error: "User not found" });
    }

    const address = user.shippingAddresses.id(addressId);
    if (!address) {
      return res.status(404).json({ status: "failed", error: "Address not found" });
    }

    if (isDefault) {
      user.shippingAddresses.forEach(addr => addr.default = false);
    }

    Object.assign(address, { name, mobileNumber, apartmentName, streetName, landmark, pincode, city, default: isDefault });
    await user.save();

    res.status(200).json({ status: "success", message: "Shipping address updated successfully", user });
  } catch (error) {
    console.error("Error updating shipping address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteShippingAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.addressId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "failed", error: "User not found" });
    }

    const address = user.shippingAddresses.id(addressId);
    if (!address) {
      return res.status(404).json({ status: "failed", error: "Address not found" });
    }

    address.remove();
    await user.save();

    res.status(200).json({ status: "success", message: "Shipping address deleted successfully", user });
  } catch (error) {
    console.error("Error deleting shipping address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};