const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const secretKey = "yourSecretKey";

const users = [
  { id: 1, UserName: "user1", Password: "Password1" },
  { id: 2, UserName: "user2", Password: "Password2" },
  { id: 3, UserName: "123", Password: "123" },
];

const generateToken = (user) => {
  return jwt.sign({ id: user.id, UserName: user.UserName }, secretKey, {
    expiresIn: "1h",
  });
};

router.post("/login", express.json(), (req, res) => {
  const { UserName, Password } = req.body;
  const user = users.find(
    (u) => u.UserName === UserName && u.Password === Password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid UserName or Password" });
  }

  const token = generateToken(user);
  res.json({ token });
});

module.exports = router;
