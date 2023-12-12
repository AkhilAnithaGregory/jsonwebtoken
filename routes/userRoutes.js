// userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.json({ users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] });
});

router.get('/data', (req, res) => {
  res.json("HAI");
});

router.post('/add-user', (req, res) => {
  const { name } = req.body;
  res.json({ success: true, message: `User ${name} added successfully` });
});

module.exports = router;
