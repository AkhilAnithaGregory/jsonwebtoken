// controllers/userController.js
const User = require("../models/user");
const companyModal = require("../models/category");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, role, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email or phoneNumber is already exists" });
    }

    const newUser = new User({ username, email, role, phoneNumber, password });
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
    //requesting header ID to pass
    const userID = req.get("ID");
    const userId = req.params.userId;
    const { companyName, Address } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the company name is already in use
    const existingCompany = await companyModal.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({ error: "Company is already in use" });
    }

    // Create a new company associated with the user
    const newCompany = new companyModal({ companyName, Address, user: userId });
    await newCompany.save();

    res.json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
