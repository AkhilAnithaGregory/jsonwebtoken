// userRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// MongoDB connection (replace 'your_database' and 'your_connection_string' with your actual values)
mongoose.connect("mongodb://localhost:27017/admin_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Route to list users from the database
router.get("/list-users", async (req, res) => {
  try {
    // Fetch users from the database
    const users = await users.find({}, { _id: 0, __v: 0 });

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/add-user", (req, res) => {
  const { name } = req.body;
  res.json({ success: true, message: `User ${name} added successfully` });
});

module.exports = router;
