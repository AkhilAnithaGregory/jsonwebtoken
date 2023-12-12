// userLoginAPI.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Secret key for signing JWT
const secretKey = "yourSecretKey";

// Sample user data (for demonstration purposes only)
const users = [
  { id: 1, UserName: "user1", Password: "Password1" },
  { id: 2, UserName: "user2", Password: "Password2" },
  { id: 3, UserName: "123", Password: "123" },
];

// Middleware to generate a JWT token upon successful login
const generateToken = (user) => {
  return jwt.sign({ id: user.id, UserName: user.UserName }, secretKey, {
    expiresIn: "1h",
  });
};

// User login endpoint
router.post("/login", express.json(), (req, res) => {
  const { UserName, Password } = req.body;
  console.log("user", UserName, Password);
  // Find the user based on the provided UserName and Password (for demonstration purposes only)
  const user = users.find(
    (u) => u.UserName === UserName && u.Password === Password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid UserName or Password" });
  }

  // Generate a JWT token upon successful login
  const token = generateToken(user);
  res.json({ token });
});

module.exports = router;
